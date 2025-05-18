import React from 'react';

const HomePage = () => (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
        <h1>Bienvenue sur Rennes Transport Explorer</h1>
        <p>
            Ce site vous permet d'explorer en détail toutes les informations du réseau de transport de Rennes grâce à l'API STAR. 
            Retrouvez les horaires en temps réel, les itinéraires, les arrêts, les lignes de bus et de métro, ainsi que de nombreuses données utiles pour vos déplacements quotidiens.
        </p>
        <ul>
            <li>Consultez les horaires en temps réel pour chaque arrêt</li>
            <li>Recherchez une ligne ou un arrêt spécifique</li>
            <li>Visualisez les plans des lignes et les correspondances</li>
            <li>Accédez à des statistiques et informations sur le trafic</li>
            <li>Découvrez les nouveautés et alertes du réseau</li>
        </ul>
        <p>
            Ce projet utilise l’API officielle STAR pour vous offrir une expérience complète et à jour sur les transports en commun de Rennes Métropole.
        </p>
        <p>
            Commencez votre exploration en utilisant le menu ou la barre de recherche !
        </p>
    </div>
);

export default HomePage;