import React from 'react';
import { Link } from 'react-router-dom';
import './middleBar.css';


function MiddelBar({ toggleSidebar }) {
  return (
    <div className={"main_container"}>
      <div className="header-wrapper">
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/personajes" className="navbar-link">Personajes</Link>
          <Link to="/lugares" className="navbar-link">Lugares</Link>
          <Link to="/episodios" className="navbar-link">Episodios</Link>
          <Link to="/about" className="navbar-link">Sobre Nosotros</Link>
          <Link to="/faq" className="navbar-link">Preguntas Frecuentes</Link>
        </div>
      </div>
    </div>

  );
}

export default MiddelBar;

