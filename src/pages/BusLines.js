import React, { useEffect, useState } from 'react';
import '../styles.css'

function BusLines() {
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(true);
    // var lignes = [];

    useEffect(() => {
        fetch('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-lignes-td/records?order_by=id&limit=100')
        .then(response => response.json())
        .then(data => {
            setLines(data.results); // Accès direct à `results`

            // console.log(lignes);
            
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
                <li key={index}>
                    <h2 style={{ backgroundColor: line.couleurligne }}>{line.nomcourt}</h2>
                    <p className='nom_long'>({line.nomlong})</p>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default BusLines;
