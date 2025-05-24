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
    const [station, setStaion] = useState(null);
    const [loading, setLoading] = useState(true);
    const url = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/vls-stations-etat-tr/records?where=idstation%3D${id}&order_by=idstation&limit=100`;

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                setStaion(data.results[0]);
                console.log(data.results[0]);
            } else {
                setStaion(null);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setStaion(null);
            setLoading(false);
        });
    }, [url]);

    if (loading) return <div className='loading'><p>Chargement...</p></div>;

    return (
        <div className="container">
            <div className="content">
                <div className="line" style={{ padding: 24 }}>
                    <div>
                        <h1>{station.nom}</h1>
                    </div>
                    <div>
                        <h1>{station.etat}</h1>
                        <p>{station.nombreemplacementsactuels} places totales.</p>
                        <p>{station.nombrevelosdisponibles} vélos restants.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Line;