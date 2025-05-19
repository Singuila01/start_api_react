import React, { useEffect, useState } from "react";
import '../styles.css'

// Exemple de données simulées (à remplacer par un appel API réel)

function MetroTime() {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const date = new Date() ;

    console.log(date);

    useEffect(() => {
        fetch('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-circulation-deux-prochains-passages-tr/records?order_by=idarret&limit=100')
        .then(response => response.json())
        .then(data => {
            setStations(data.results); // Accès direct à `results`
            console.log(data.results);
            setLoading(false);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (selectedStation) {
            // Remplacer par un fetch vers l'API réelle
            setSchedules(stations[selectedStation] || []);
        }
    }, [selectedStation]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    // Extraire les stations uniques pour la liste déroulante
    const uniqueStations = Array.from(
        new Map(stations.map(station => [station.idarret, station])).values()
    );

    return (
        <div className="metro" style={{ padding: 24 }}>
            <h1>Horaires du métro</h1>
            <label>
                Choisissez une station :
                <select
                    value={selectedStation || ""}
                    onChange={e => setSelectedStation(e.target.value)}
                >
                    <option value="">-- Sélectionnez --</option>
                    {uniqueStations.map(station => (
                        <option key={station.idarret} value={station.idarret}>
                            {station.nomarret}
                        </option>
                    ))}
                </select>
            </label>
            {selectedStation && (
                <div style={{ marginTop: 24 }}>
                    <h2>Prochains passages :</h2>
                    <ul>
                        {stations
                            .filter(station => station.idarret === selectedStation)
                            .map((station, idx) => (
                                <li key={idx}>
                                    <p><b>Direction:</b> {station.destination}</p>
                                    <p><b>Prochain métro:</b> {station.arriveefirsttrain}</p>
                                    <p><b>Métro suivant:</b> {station.arriveesecondtrain}</p>
                                </li>
                            ))}
                        {stations.filter(station => station.idarret === selectedStation).length === 0 && (
                            <li>Aucun horaire disponible</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MetroTime;