import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BusLines from './pages/BusLines';
import HomePage from './pages/HomePage';
import MetroTime from './pages/MetroTime';
import ParcRelais from './pages/ParcRelais';
import Header from './Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bus" element={<BusLines />} />
                <Route path="/metro" element={<MetroTime />} />
                <Route path="/parc" element={<ParcRelais />} />
            </Routes>
        </Router>
    );
}

export default App;
