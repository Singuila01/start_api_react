import React from 'react';
import { Link } from "react-router";

const HomePage = () => (
    <div className='container'>
        <div className='presentation'>
            <h1>Présentation</h1>
            <p>
                Ce site vous permet d'explorer en détail toutes les informations du réseau de transport de Rennes grâce à l'API STAR. 
                Retrouvez les horaires en temps réel, les itinéraires, les arrêts, les lignes de bus et de métro, ainsi que de nombreuses données utiles pour vos déplacements quotidiens.
            </p>
        </div>
        <div className='list'>
            <ul>
                <li>
                    <p>Consultez les horaires en temps réel pour chaque arrêt <span>comming soon</span></p>
                </li>
                <li>
                    <p>Recherchez une ligne ou un arrêt spécifique</p>
                </li>
                <li>
                    <p>Visualisez les itinéraires de bus et de métro</p>
                </li>
                <li>
                    <Link to="/bus">Accédez aux informations détaillées sur chaque ligne</Link>
                </li>
                <li>
                    <Link to="/parc">Visualiez les différents parking relais présents sur le réseau</Link>
                </li>
                <li>
                    <p>Découvrez les nouveautés et alertes du réseau</p>
                </li>
            </ul>
        </div>
        <div className='description'>
            <h1>Description</h1>
            <p>
                Ce projet utilise l’API officielle STAR pour vous offrir une expérience complète et à jour sur les transports en commun de Rennes Métropole.
            </p>
            <p>
                Commencez votre exploration en utilisant le menu ou la barre de recherche !
            </p>
        </div>
    </div>
);

export default HomePage;