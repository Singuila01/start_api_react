import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css'; // Assuming you have a CSS file for styles

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

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
            {isHome ? (
                <div className='content_home'>
                    <h1>Bienvenue sur Rennes Transport Explorer</h1>
                </div>
            ) : (
                <div className='content_other'>
                    <h1>Vous êtes sur la page XXX</h1>
                </div>
            )}
        </header>
    );
}

export default Header;