import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/homePage';
import UtilisateursPage from './components/utilisateursPage';
import UtilisateursAddPage from './components/utilisateursAddPage';
import UtilisateursEditPage from './components/utilisateursEditPage';
import './assets/css/App.css';
import './assets/css/utilisateurs.css';


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/utilisateurs">Utilisateurs</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/utilisateurs" element={<UtilisateursPage />} />
                    <Route path="/utilisateurs/ajouter" element={<UtilisateursAddPage />} />
                    <Route path="/utilisateurs/modifier" element={<UtilisateursEditPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
