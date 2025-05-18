import React, { useEffect, useState } from 'react';
import '../styles.css'

function BusLines() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-lignes-td/records?order_by=id&limit=100')
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // Utile pour voir la structure
            setLines(data.results); // Accès direct à `results`
            console.log(data.results); // Affiche les résultats dans la console
            setLoading(false);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className='bus-lines'>
            <h1>Lignes de bus</h1>
            <ul>
                {lines.map((line, index) => (
                <li key={index} style={{ backgroundColor: line.couleurligne }}>
                    <h2>{line.nomcourt}</h2>
                    <p className='nom_long'>({line.nomlong})</p>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default BusLines;
