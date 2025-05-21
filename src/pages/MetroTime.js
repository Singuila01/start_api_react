import React, { useEffect, useState } from "react";
import '../styles.css'

function getFormattedNow() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getMinutesBetween(date1Str, date2Str) {
    const date1 = new Date(date1Str.replace(' ', 'T'));
    const date2 = new Date(date2Str.replace(' ', 'T'));

    const diffMs = date2 - date1;
    const diffMinutes = Math.round(diffMs / 60000);

    return diffMinutes;
}

function MetroTime() {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [minutesOne, setMinutesOne] = useState([]);
    const [minutesTwo, setMinutesTwo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-circulation-deux-prochains-passages-tr/records?order_by=idarret&limit=100");
            const data = await res.json();

            if (data.results.length > 0) {
                const premier_passage = data.results[0].arriveefirsttrain;
                const second_passage = data.results[0].arriveesecondtrain;
                const maintenant = getFormattedNow();

                const calcul_premier = getMinutesBetween(maintenant, premier_passage);
                const calcul_second = getMinutesBetween(maintenant, second_passage);
                
                setStations(data.results);
                setMinutesOne(calcul_premier);
                setMinutesTwo(calcul_second);

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (selectedStation) {
    //         // Remplacer par un fetch vers l'API réelle
    //         setSchedules(stations[selectedStation] || []);
    //     }
    // }, [selectedStation]);

    if (loading) return <div className='loading'><p>Chargement...</p></div>;

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
                                    <p><b>Prochain métro:</b> {minutesOne } minutes</p>
                                    <p><b>Métro suivant:</b> {minutesTwo} minutes</p>
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