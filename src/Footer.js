import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Assuming you have a CSS file for styles

function Footer() {
    return (
        <footer className='footer'>
            <nav>
                <li>
                    <p>© - Rennes Transport Explorer - 2025</p>
                </li>
                <li>
                    <Link to="/">
                        Accueil
                    </Link>
                    <Link to="/bus">
                        Lignes de bus
                    </Link>
                    <Link to="/metro">
                        Horaires du métro
                    </Link>
                </li>
            </nav>
        </footer>
    );
}

export default Footer;