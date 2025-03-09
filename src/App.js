import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/homePage';
import UtilisateursPage from './components/utilisateurs/utilisateursPage';
import UtilisateursAddPage from './components/utilisateurs/utilisateursAddPage';
import UtilisateursEditPage from './components/utilisateurs/utilisateursEditPage';
import AuteursPage from './components/auteurs/auteursPage';
import AuteursAddPage from './components/auteurs/auteursAddPage';
import AuteursEditPage from './components/auteurs/auteursEditPage';
import LivresPage from './components/livres/livresPage';
import LivresAddPage from './components/livres/livresAddPage';
import LivresEditPage from './components/livres/livresEditPage';
import LivresDetailsPage from './components/livres/livresDetailsPage';
import './assets/css/App.css';
import './assets/css/utilisateurs.css';
import './assets/css/auteurs.css';
import './assets/css/livres.css';


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/utilisateurs">Utilisateurs</Link>
                    <Link to="/auteurs">Auteurs</Link>
                    <Link to="/livres">Livres</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/utilisateurs" element={<UtilisateursPage />} />
                    <Route path="/utilisateurs/ajouter" element={<UtilisateursAddPage />} />
                    <Route path="/utilisateurs/modifier" element={<UtilisateursEditPage />} />

                    <Route path="/auteurs" element={<AuteursPage />} />
                    <Route path="/auteurs/ajouter" element={<AuteursAddPage />} />
                    <Route path="/auteurs/modifier" element={<AuteursEditPage />} />

                    <Route path="/livres" element={<LivresPage />} />
                    <Route path="/livres/ajouter" element={<LivresAddPage />} />
                    <Route path="/livres/modifier" element={<LivresEditPage />} />
                    <Route path="/livres/details" element={<LivresDetailsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
