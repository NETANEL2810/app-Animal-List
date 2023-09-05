import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='container-fluid shadow'>
      <div className="container">
        <div className="row align-items-center ">

          <div className='logo col-auto'>
            <h2>Monkeys</h2>
          </div>
          <nav className='col-auto d-flex'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/animals">Animals</Link></li>
            </ul>
          </nav>
        </div>
      </div>

    </header>
  )
}
