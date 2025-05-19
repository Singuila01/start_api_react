import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Assuming you have a CSS file for styles

function Header() {
    return (
        <header className='header'>
            <nav>
                <Link to="/">
                    Accueil
                </Link>
                <Link to="/bus">
                    Lignes de bus
                </Link>
                <Link to="/metro">
                    Horaires du métro
                </Link>
            </nav>
        </header>
    );
}

export default Header;