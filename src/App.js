import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/homePage';
import UtilisateursPage from './components/utilisateurs/utilisateursPage';
import UtilisateursAddPage from './components/utilisateurs/utilisateursAddPage';
import UtilisateursEditPage from './components/utilisateurs/utilisateursEditPage';
import UtilisateursDeletePage from './components/utilisateurs/utilisateursDeletePage';
import AuteursPage from './components/auteurs/auteursPage';
import AuteursAddPage from './components/auteurs/auteursAddPage';
import AuteursEditPage from './components/auteurs/auteursEditPage';
import AuteursDeletePage from './components/auteurs/auteursDeletePage';
import LivresPage from './components/livres/livresPage';
import LivresAddPage from './components/livres/livresAddPage';
import LivresEditPage from './components/livres/livresEditPage';
import LivresDetailsPage from './components/livres/livresDetailsPage';
import LivresDeletePage from './components/livres/livresDeletePage';
import EmpruntsPage from './components/emprunts/empruntsPage';
import EmpruntsAddPage from './components/emprunts/empruntsAddPage';
import EmpruntsEditPage from './components/emprunts/empruntsEditPage';
import EmpruntsDeletePage from './components/emprunts/empruntsDeletePage';
import './assets/css/App.css';
import './assets/css/utilisateurs.css';
import './assets/css/auteurs.css';
import './assets/css/livres.css';
import './assets/css/emprunts.css';

const api_url = "http://127.0.0.1:3001/api/v1";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/utilisateurs">Utilisateurs</Link>
                    <Link to="/auteurs">Auteurs</Link>
                    <Link to="/livres">Livres</Link>
                    <Link to="/emprunts">Emprunts</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/utilisateurs" element={<UtilisateursPage api_url={api_url}/>} />
                    <Route path="/utilisateurs/ajouter" element={<UtilisateursAddPage api_url={api_url}/>} />
                    <Route path="/utilisateurs/modifier" element={<UtilisateursEditPage api_url={api_url}/>} />
                    <Route path="/utilisateurs/supprimer" element={<UtilisateursDeletePage api_url={api_url}/>} />

                    <Route path="/auteurs" element={<AuteursPage api_url={api_url}/>} />
                    <Route path="/auteurs/ajouter" element={<AuteursAddPage api_url={api_url}/>} />
                    <Route path="/auteurs/modifier" element={<AuteursEditPage api_url={api_url}/>} />
                    <Route path="/auteurs/supprimer" element={<AuteursDeletePage api_url={api_url}/>} />

                    <Route path="/livres" element={<LivresPage api_url={api_url}/>} />
                    <Route path="/livres/ajouter" element={<LivresAddPage api_url={api_url}/>} />
                    <Route path="/livres/modifier" element={<LivresEditPage api_url={api_url}/>} />
                    <Route path="/livres/details" element={<LivresDetailsPage api_url={api_url}/>} />
                    <Route path="/livres/supprimer" element={<LivresDeletePage api_url={api_url}/>} />

                    <Route path="/emprunts" element={<EmpruntsPage api_url={api_url}/>} />
                    <Route path="/emprunts/ajouter" element={<EmpruntsAddPage api_url={api_url}/>} />
                    <Route path="/emprunts/modifier" element={<EmpruntsEditPage api_url={api_url}/>} />
                    <Route path="/emprunts/supprimer" element={<EmpruntsDeletePage api_url={api_url}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
