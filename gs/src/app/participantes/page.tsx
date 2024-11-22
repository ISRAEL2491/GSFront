import Link from 'next/link';
import React from 'react';
// import Image from 'next/image';
// import Israel from '@/Image/israel.jpg'
// import Luketa from '@/Images/l.jpg';
// import Marcos from '@/Image/marcos.jpg';

const Participantes = () => {
  return (
    <div>

      <div className="titulo-participantes">
        <h1>Participantes</h1>
      </div>

      <div className="participantes">
        {/* Card do Israel */}
        <div className="participante-card">
          {/* <Image alt="Israel" src={Israel} className="participante-imagem" /> */}
          <p className="participante-nome">Israel Rodrigues</p>
          <p className="participante-rm">RM: 557964</p>
          <p>
            <Link href="https://github.com/ISRAEL2491" target="_blank">GitHub</Link>
          </p>
          <p>
            <Link href="https://www.linkedin.com/in/israel-rodrigues-91b043302/" target="_blank">LinkedIn</Link>
          </p>
        </div>

        {/* Card do Lucas */}
        <div className="participante-card">
          {/* <Image alt="Lucas" src={Luketa} className="participante-imagem" /> */}
          <p className="participante-nome">Lucas</p>
          <p className="participante-rm">RM:557957</p>
          <p>
            <Link href="https://github.com/luketa02496" target="_blank">GitHub</Link>
          </p>
          <p>
            <Link href="https://www.instagram.com/lukke.ta?igsh=MWRrNWxtYjlnOW41bg==" target="_blank">Instagram</Link>
          </p>
        </div>

        {/* Card do Marcos */}
        <div className="participante-card">
          {/* <Image alt="Marcos" src={Marcos} className="participante-imagem" /> */}
          <p className="participante-nome">Marcos Vinicius</p>
          <p className="participante-rm">RM:558054</p>
          <p>
            <Link href="https://github.com/MARCOSBISP" target="_blank">GitHub</Link>
          </p>
          <p>
            <Link href="https://www.linkedin.com/in/marcos-bispo-48a23a2b6" target="_blank">LinkedIn</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Participantes;
