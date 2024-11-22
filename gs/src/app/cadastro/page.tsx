"use client";

import { TipoCadastro } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Cadastro() {
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState<TipoCadastro>({
    idUsuario: 0,
    id_usuario: 0,
    nome: '',
    email: '',
    senha: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          idUsuario: 0,
          id_usuario: 0,
          nome: '',
          email: '',
          senha: '',
        });
        setMensagem('Cadastro realizado com sucesso!');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || 'Erro ao realizar o cadastro.';
        setMensagem(errorMessage);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro inesperado. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Cadastro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          id="name"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="form-input"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$"
        />
        <input
          type="password"
          id="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          required
          className="form-input"
        />
        <button type="submit" className="register-button">Cadastrar</button>
        <p className="register-footer">
          Já tem uma conta? <Link href="/login" className="login-link">Faça login</Link>
        </p>
      </form>
      <p
        className={`register-message ${
          mensagem.includes('sucesso') ? 'message-success' : 'message-error'
        }`}
      >
        {mensagem}
      </p>
    </div>
  );
}
