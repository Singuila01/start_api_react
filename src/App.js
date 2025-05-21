import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BusLines from './pages/BusLines';
import HomePage from './pages/HomePage';
import MetroTime from './pages/MetroTime';
import ParcRelais from './pages/ParcRelais';
import Line from './pages/Line';
import VeloStar from './pages/VeloStar';
import StationVelo from './pages/StationVelo';
import Header from './Header';
import Footer from './Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bus" element={<BusLines />} />
                <Route path="/bus/:id" element={<Line />} />
                <Route path="/metro" element={<MetroTime />} />
                <Route path="/parc" element={<ParcRelais />} />
                <Route path="/velo" element={<VeloStar />} />
                <Route path="/velo/:id" element={<StationVelo />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
