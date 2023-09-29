import React from 'react';
import '../../assets/css/menu.css'
function Footer() {
    const currentYear = new Date().getFullYear();
    const companyName = 'Tiendita.Soft';

    return (
        <footer>
            <p>&copy; {currentYear} {companyName}. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;