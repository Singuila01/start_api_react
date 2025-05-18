import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Assuming you have a CSS file for styles

function Header() {
    return (
        <header style={{
            background: '#282c34',
            color: 'white',
            padding: '16px 0',
            marginBottom: 32,
            textAlign: 'center'
        }}>
            <nav>
                <Link to="/" style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Accueil
                </Link>
                <Link to="/bus" style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Lignes de bus
                </Link>
            </nav>
        </header>
    );
}

export default Header;