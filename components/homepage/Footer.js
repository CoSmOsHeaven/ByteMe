import React from 'react';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="simple-footer">
            © {year} ByteMe. Todos los derechos reservados.
        </footer>
    );
};

export default Footer;