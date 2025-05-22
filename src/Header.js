import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css'; // Assuming you have a CSS file for styles

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className='header'>
            <nav className='desktop_nav'>
                <Link to="/">
                    Accueil
                </Link>
                <Link to="/bus">
                    Lignes de bus
                </Link>
                <Link to="/metro">
                    Horaires du métro
                </Link>
                <Link to="/velo">
                    Velos Star
                </Link>
            </nav>
            <nav className='mobile_nav'>
                <input type="checkbox" id="menu-toggle" className="menu-toggle" />
                <label htmlFor="menu-toggle" className="menu-icon open">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <label htmlFor="menu-toggle" className="menu-icon close">
                    <span></span>
                </label>
                <div className="mobile_menu">
                    <Link to="/" onClick={() => document.getElementById('menu-toggle').checked = false}>
                        Accueil
                    </Link>
                    <Link to="/bus" onClick={() => document.getElementById('menu-toggle').checked = false}>
                        Lignes de bus
                    </Link>
                    <Link to="/metro" onClick={() => document.getElementById('menu-toggle').checked = false}>
                        Horaires du métro
                    </Link>
                    <Link to="/velo" onClick={() => document.getElementById('menu-toggle').checked = false}>
                        Velos Star
                    </Link>
                </div>
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