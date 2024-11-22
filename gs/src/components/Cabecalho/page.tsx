import Link from 'next/link'
import React from 'react'

export const Cabecalho = () => {
  return (
    <div>
      <div className="cabecalho">
        <div className="menu">
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/cadastro">Cadastro</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/perfil">Perfil</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
