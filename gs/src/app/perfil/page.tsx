"use client";
import { TipoCadastro } from '@/types'; // Importa o tipo de dados para o usuário
import Link from 'next/link'; // Importa o Link do Next.js para navegação
import { useRouter } from 'next/navigation'; // Importa o hook do Next.js para navegação
import React, { useEffect, useState } from 'react'; // Importa React e hooks necessários

export default function EditarExcluirUsuario() {
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const navigate = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [usuario, setUsuario] = useState<TipoCadastro>({
    idUsuario: 0,
    id_usuario: 0,
    nome: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      const usuarioData = JSON.parse(usuarioLocal);
      setUsuario(usuarioData);
      setIsEditMode(true); // Definindo que o modo de edição está ativado
    } else {
      chamadaApi(); // Caso não tenha dados no localStorage, chama a API
    }
  }, []);

  // Função para chamar a API e recuperar os dados do usuário
  const chamadaApi = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios');
      const data = await response.json();
      if (data) {
        setUsuario(data);
      } else {
        setMensagemFeedback('Nenhum dado encontrado.');
      }
    } catch (error) {
      console.error("Falha na listagem", error);
      setMensagemFeedback('Falha ao carregar os dados.');
    }
  };

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    try {
      const url = `http://localhost:8080/usuarios/${usuario.idUsuario}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idUsuario: usuario.idUsuario,
          id_usuario: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro desconhecido.');
      }

      const responseBody = await response.json();
      if (responseBody) {
        alert("Conta editada com sucesso!");

        // Atualiza o localStorage com os novos dados do usuário
        localStorage.setItem("usuario", JSON.stringify(usuario));

        setUsuario({
          idUsuario: 0,
          id_usuario: 0,
          nome: "",
          email: "",
          senha: "",
        });
        setIsEditMode(false);

        // Recarrega a página
        window.location.reload();
      } else {
        throw new Error('Resposta vazia do servidor.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setMensagemFeedback(`Falha no processo: ${error.message}`);
      } else {
        setMensagemFeedback(`Falha no processo: Um erro desconhecido ocorreu.`);
      }
      console.error("Erro na requisição:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${usuario.idUsuario}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro desconhecido ao excluir.');
      }

      alert("Usuário removido com sucesso!");
      localStorage.removeItem("usuario"); // Remove os dados do usuário após exclusão
      navigate.push("/cadastro");
    } catch (error) {
      console.error("Falha ao remover usuário.", error);
      setMensagemFeedback('Falha ao remover usuário: ' + (error instanceof Error ? error.message : 'Erro desconhecido.'));
    }
  };

  return (
    <div className="editar-excluir-page">
      <h2 className="titulo">Editar ou Excluir Conta</h2>
      {isEditMode && (
        <form onSubmit={handleSubmit} className="input-area">
          <label htmlFor="idNome">Nome completo:</label>
          <input
            type="text"
            id="idNome"
            name="nome"
            placeholder="Nome completo"
            value={usuario.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="idEmail">Email:</label>
          <input
            type="email"
            id="idEmail"
            name="email"
            placeholder="Email"
            value={usuario.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="idSenha">Senha:</label>
          <input
            type="password"
            id="idSenha"
            name="senha"
            placeholder="Senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />

          <div className="atualiza">
            <button type="submit" className="botao-atualizar">
              Atualizar Dados
            </button>
          </div>

          <div className="excluir">
            <button type="button" onClick={handleDelete} className="botao-excluir">
              Excluir Conta
            </button>
          </div>
        </form>
      )}
      
      <p className={mensagemFeedback.includes('sucesso') ? 'mensagem-sucesso' : 'mensagem-erro'}>
        {mensagemFeedback}
      </p>

      <p className="login">
        <Link href="/" className="voltar-perfil">Voltar para a página inicial</Link>
      </p>
    </div>
  );
}
