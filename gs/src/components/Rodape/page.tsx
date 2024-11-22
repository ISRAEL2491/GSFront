import Link from "next/link";

export const Rodape = () => {
  return (
    <div className="rodape-container">
      <div className="rodape">
        <h2>REDES SOCIAIS</h2>
        <div className="social-media-links">
          <div className="social-media-item">
            <ul>
              <li>
                <Link 
                  className="facebook-link" 
                  target="_blank" 
                  rel="noopener" 
                  title="Facebook" 
                  href="https://www.facebook.com"
                >
                  FACEBOOK
                </Link>
              </li>
            </ul>
          </div>

          <div className="social-media-item">
            <ul>
              <li>
                <Link 
                  className="instagram-link" 
                  target="_blank" 
                  rel="noopener" 
                  title="Instagram" 
                  href="https://www.instagram.com"
                >
                  INSTAGRAM
                </Link>
              </li>
            </ul>
          </div>

          <div className="social-media-item">
            <ul>
              <li>
                <Link 
                  className="github-link" 
                  target="_blank" 
                  rel="noopener" 
                  title="GitHub" 
                  href="https://github.com"
                >
                  GITHUB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="additional-info">
          <div className="company-info">
            <h3>Sobre a Empresa</h3>
            <p>Somos uma empresa focada em soluções inovadoras de energia sustentável. Nosso compromisso é oferecer produtos e serviços que ajudam a preservar o meio ambiente e promover um futuro mais verde e sustentável.</p>
          </div>

          <div className="useful-links">
            <h3>Úteis</h3>
            <ul>
              <li>
                <Link href="/sobre">Sobre Nós</Link>
              </li>
              <li>
                <p>Política de Privacidade</p>
              </li>
            </ul>
          </div>

          <div className="contact-info">
            <h3>Contato</h3>
            <p>Email: <Link href="mailto:neoenergy588@gmail.com">neoenergy588@gmail.com</Link></p>
          </div>
        </div>
        
        <div className="rodape-footer">
          <p>&copy; {new Date().getFullYear()} - Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};
