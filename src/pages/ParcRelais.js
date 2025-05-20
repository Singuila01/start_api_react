import React, { useEffect, useState } from "react";
import '../styles.css'

function ParcRelais() {
    const [parcs, setParc] = React.useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-parcsrelais-star-etat-tr/records?limit=20')
        .then(response => response.json())
        .then(data => {
            setParc(data.results); // Accès direct à `results`
            console.log(data.results);
            setLoading(false);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="container">
            <div className="content">
                <ul className="list-parc">
                    {parcs.map(parc => (
                        <li key={parc.idarret} >
                            <h2 className={parc.etatouverture}>{parc.nom} <br/><span>{parc.etatouverture}</span></h2>
                            <p>{parc.capaciteparking} places</p>
                            <p>{parc.capacitesoliste} places disponibles</p>
                            <p>Mise à jour le {parc.lastupdate}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ParcRelais;