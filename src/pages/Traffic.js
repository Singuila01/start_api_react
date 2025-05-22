import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import '../styles.css'

function formatDateToFrench(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) + ' à ' + date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(':', 'h');
}

function replaceText(texte) {
    const texteAvecBr = texte.replace(/(?=Ligne=?)/, ', ');

    return texteAvecBr;
}

function Traffic() {
    const [infos, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    // var lignes = [];

    useEffect(() => {
        fetch('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-busmetro-trafic-alertes-tr/records?order_by=idligne&limit=100')
        .then(response => response.json())
        .then(data => {
            setInfo(data.results);

            console.log(data.results);
            
            setLoading(false);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className='loading'><p>Chargement...</p></div>;

    return (
        <div className='traffic'>
            <h1>Traffic</h1>
            <ul>
                {infos.map((info, index) => (
                    <li key={index}>
                        <Link to={info.url} target="_blank">
                            <h2>{info.titre}</h2>
                            <h3>Du {formatDateToFrench(info.debutvalidite)} <br/> au {formatDateToFrench(info.finvalidite)}</h3>
                            <p>{replaceText(info.description)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Traffic;
