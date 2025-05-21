import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import '../styles.css'

function VeloStar() {
    const [velos, setVelo] = React.useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/vls-stations-topologie-td/records?order_by=id&limit=100')
        .then(response => response.json())
        .then(data => {
            setVelo(data.results); // Accès direct à `results`
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
        <div className="container">
            <div className="content">
                <ul className="list-velo">
                    {velos.map(velo => (
                        <li key={velo.id} >
                            <Link to={`/velo/${velo.id}`}>
                                <h2>{velo.nom}</h2>
                                <p>Se situe {velo.adressenumero} {velo.adressevoie}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default VeloStar;