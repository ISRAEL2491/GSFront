"use client";
import React, { useState } from 'react';

interface TipoConta {
  id_economia: number;
  consumo_mensal_energia: string;
  custo_energia: string;
  economia_es: string;
  economia_total: string;
}

interface ObjetoConsumo {
  nome: string;
  consumo: string;
}

const Calculadora = () => {
  const [calculo, setCalculo] = useState<TipoConta>({
    id_economia: 0,
    consumo_mensal_energia: '',
    custo_energia: '',
    economia_es: '',
    economia_total: '',
  });

  const [itensConsumo, setItensConsumo] = useState<ObjetoConsumo[]>([]);
  const [nomeObjeto, setNomeObjeto] = useState('');
  const [consumoObjeto, setConsumoObjeto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState<string>('');

  // Função para adicionar novo item de consumo
  const adicionarObjetoConsumo = () => {
    if (nomeObjeto && consumoObjeto) {
      setItensConsumo([
        ...itensConsumo,
        { nome: nomeObjeto, consumo: consumoObjeto },
      ]);
      setNomeObjeto('');
      setConsumoObjeto('');
    } else {
      setMensagemFeedback('Por favor, preencha ambos os campos: nome e consumo.');
    }
  };

  // Função para tratar as mudanças nos campos de input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nomeObjeto') {
      setNomeObjeto(value);
    } else if (name === 'consumoObjeto') {
      setConsumoObjeto(value);
    } else {
      setCalculo({
        ...calculo,
        [name]: value, // Atualiza o estado com o nome do campo e o valor
      });
    }
  };

  // Função para calcular o consumo total e o custo
  const calcularConsumoTotal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o carregamento enquanto calcula
    setMensagemFeedback(''); // Limpa mensagens anteriores

    // Calcula o consumo total somando os consumos de todos os objetos
    const totalConsumo = itensConsumo.reduce((total, item) => {
      return total + parseFloat(item.consumo);
    }, 0);

    // Verifica se o consumo total é válido
    if (isNaN(totalConsumo)) {
      setMensagemFeedback('Por favor, insira valores válidos para todos os objetos.');
      setIsLoading(false); // Desativa o carregamento
      return;
    }

    // Calcula o custo total
    const custoEnergia = parseFloat(calculo.custo_energia);
    if (isNaN(custoEnergia)) {
      setMensagemFeedback('Por favor, insira um valor válido para o custo da energia.');
      setIsLoading(false); // Desativa o carregamento
      return;
    }
    const custoTotal = totalConsumo * custoEnergia;

    // Atualiza o consumo total e o custo total no estado
    setCalculo({
      ...calculo,
      consumo_mensal_energia: totalConsumo.toFixed(2), // Exibe o total de consumo de energia
      economia_total: custoTotal.toFixed(2), // Exibe o custo total
    });

    setIsLoading(false); // Desativa o carregamento após o cálculo
    setMensagemFeedback('Cálculo realizado com sucesso!');
  };

  // Função para resetar os campos e o estado para permitir novo cálculo
  const novoCalculo = () => {
    setCalculo({
      id_economia: 0,
      consumo_mensal_energia: '',
      custo_energia: '',
      economia_es: '',
      economia_total: '',
    });
    setItensConsumo([]); // Limpa a lista de objetos
    setMensagemFeedback(''); // Limpa qualquer mensagem de feedback
  };

  return (
    <div className='py-10'>
      <div className="calculadora-container">
        <h1 className="calculadora-title">Calculadora de Gastos</h1>
        <p className="calculadora-description">Descubra quanto você gasta de energia em seu dia a dia.</p>

        <section className="form-container">
          <form className="form" onSubmit={calcularConsumoTotal}>
            <fieldset className="fieldset">
              <legend className="legend">Adicione Seus Objetos</legend>
              <div className="input-group">
                <label htmlFor="nomeObjeto">Nome do Objeto:</label>
                <input
                  type="text"
                  id="nomeObjeto"
                  name="nomeObjeto"
                  value={nomeObjeto}
                  onChange={handleChange}
                  placeholder="Ex: Geladeira"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="consumoObjeto">Consumo do Objeto (kWh):</label>
                <input
                  type="number"
                  id="consumoObjeto"
                  name="consumoObjeto"
                  value={consumoObjeto}
                  onChange={handleChange}
                  placeholder="Ex: 200"
                  min="0"
                  required
                />
              </div>
              <div className="add-object-button">
                <button type="button" onClick={adicionarObjetoConsumo}>
                  Adicionar Objeto
                </button>
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="legend">Calcule seu Consumo Total</legend>

              <div className="input-group">
                <label htmlFor="custo_energia">Custo da Energia (R$/kWh):</label>
                <input
                  type="number"
                  id="custo_energia"
                  name="custo_energia"
                  value={calculo.custo_energia}
                  onChange={handleChange}
                  placeholder="Ex: 1"
                  min="0"
                  required
                />
              </div>

              <div className="calculate-button">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Calculando...' : 'Calcular Consumo Total'}
                </button>
              </div>
            </fieldset>
          </form>
        </section>

        <div className="result-container">
          <h2 className="result-title">Resultado Estimado</h2>
          <p className="result-item">Consumo Total Estimado (kWh): {calculo.consumo_mensal_energia}</p>
          <p className="result-item">Custo Total Estimado (R$): {calculo.economia_total}</p>
        </div>

        {/* Exibe mensagem de feedback */}
        {mensagemFeedback && (
          <div className="feedback-message">
            <p>{mensagemFeedback}</p>
          </div>
        )}

        {/* Exibe a lista de objetos de consumo */}
        <div className="items-list">
          <h3 className="items-list-title">Objetos Adicionados:</h3>
          <ul className="items-list-ul">
            {itensConsumo.map((item, index) => (
              <li key={index} className="items-list-item">
                {item.nome} - {item.consumo} kWh
              </li>
            ))}
          </ul>
        </div>

        {/* Botão para novo cálculo */}
        <div className="new-calculation">
          <h2 className="new-calculation-title">Deseja fazer outro cálculo?</h2>
          <button className="new-calculation-button" onClick={novoCalculo}>Clique aqui</button>
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
