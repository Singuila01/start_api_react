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

function MetroTest() {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [minutesOne, setMinutesOne] = useState(null);
    const [minutesTwo, setMinutesTwo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-circulation-deux-prochains-passages-tr/records?order_by=idarret&limit=100");
            const data = await res.json();
            setStations(data.results);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedStation) {
            setMinutesOne(null);
            setMinutesTwo(null);
            return;
        }
        const now = getFormattedNow();
        const station = stations.find(st => st.idarret === selectedStation);
        if (station) {
            const premier_passage = station.arriveefirsttrain;
            const second_passage = station.arriveesecondtrain;
            setMinutesOne(getMinutesBetween(now, premier_passage));
            setMinutesTwo(getMinutesBetween(now, second_passage));
        }
    }, [selectedStation, stations]);

    if (loading) return <div className='loading'><p>Chargement...</p></div>;

    return (
        <div className="container">
            <div className="content">
                <div className="metro" style={{ padding: 24 }}>
                    <h1>Horaires du métro</h1>
                    <label>
                        Choisissez une station :
                        <select
                            value={selectedStation || ""}
                            onChange={e => setSelectedStation(e.target.value)}
                        >
                            <option value="">-- Sélectionnez --</option>
                            {/* On filtre les doublons par nom de station */}
                            {Array.from(
                                new Map(stations.map(station => [station.nomarret, station])).values()
                            ).map(station => (
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
                                {/* On affiche tous les passages pour cette station, dans chaque direction */}
                                {stations
                                    .filter(st => st.nomarret === stations.find(s => s.idarret === selectedStation)?.nomarret)
                                    .map((station, idx) => {
                                        const now = getFormattedNow();
                                        const minutesOne = getMinutesBetween(now, station.arriveefirsttrain);
                                        const minutesTwo = getMinutesBetween(now, station.arriveesecondtrain);
                                        return (
                                            <li key={idx}>
                                                <p>
                                                    <b>Direction :</b> {station.destination}
                                                </p>
                                                <p>
                                                    <b>Prochain métro :</b> {minutesOne} minutes
                                                </p>
                                                <p>
                                                    <b>Métro suivant :</b> {minutesTwo} minutes
                                                </p>
                                            </li>
                                        );
                                    })}
                                {stations.filter(st => st.nomarret === stations.find(s => s.idarret === selectedStation)?.nomarret).length === 0 && (
                                    <li>Aucun horaire disponible</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MetroTest;