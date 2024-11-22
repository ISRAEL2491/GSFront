import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='home'>
      <h1>Bem-vindo ao NeoEnergy: Energia Sustentável na Sua Mão</h1>
      <p>
        O NeoEnergy oferece uma maneira inteligente e consciente de consumir energia. Nossa plataforma ajuda você a identificar desperdícios, 
        sugere aparelhos mais eficientes e permite que você acompanhe o consumo de energia em tempo real. A nossa missão é oferecer soluções que 
        promovem economia, praticidade e sustentabilidade, para que você possa fazer a diferença na sua casa e no planeta.
      </p>

      <div className="dicas">
        <h2>Descubra Dicas para Economizar Energia</h2>
        <p>
          Quer saber como reduzir seus gastos com energia? Temos diversas dicas simples e eficazes para ajudá-lo a economizar no dia a dia. 
          Acesse nossa seção de dicas para aprender mais sobre como usar a energia de forma inteligente.
        </p>
        <p>
          <Link href="/dicas">Acesse as Dicas</Link>
        </p>
      </div>

      <div className="nossa-equipe">
        <h2>Conheça a Nossa Equipe</h2>
        <p>
          Somos uma equipe apaixonada por soluções sustentáveis. Cada um de nós trabalha para tornar o uso de energia mais eficiente e acessível 
          a todos. Para saber mais sobre quem está por trás do NeoEnergy e como nossa equipe contribui para um futuro mais verde, clique no link abaixo.
        </p>
        <p>
          <Link href="/participantes">Conheça os Participantes</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
