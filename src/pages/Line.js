import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function formatDateToFrench(dateString) {
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    const [datePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
}

const Line = () => {
    const { id } = useParams();
    const [busLine, setBusLine] = useState(null);
    const url = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-lignes-td/records?where=id%3D%22${id}%22&order_by=id&limit=100`;

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                setBusLine(data.results[0]);
                console.log(data.results[0]);
            } else {
                setBusLine(null);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setBusLine(null);
        });
    }, [url]);

    if (!busLine) {
        return <div style={{ padding: 24 }}>Chargement...</div>;
    }

    return (
        <div className="container">
            <div className="content">
                <div className="line" style={{ padding: 24 }}>
                    <div>
                        <h1 style={{ backgroundColor: busLine.couleurligne, color: busLine.couleurtexteligne }}>{busLine.nomcourt}</h1>
                    </div>
                    <div>
                        <h1>{busLine.nomlong}</h1>
                        <p>Type: {busLine.nomfamillecommerciale}</p>
                        <p>Date de lancement: {formatDateToFrench(busLine.datedebutversion)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Line;