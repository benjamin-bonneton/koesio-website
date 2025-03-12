import React,  {useState, useEffect} from 'react';
import axios from 'axios';

const EmpruntDiv = ({ emprunt }) => {
    let status = emprunt.date_retour == null ? "En cours" : "Rendu";

    if (status === "Rendu") {
        return (
            <tr>
                <td>{emprunt.livre_isbn}</td>
                <td>{emprunt.livre_titre}</td>
                <td>{emprunt.utilisateur_nom} {emprunt.utilisateur_prenom}</td>
                <td>{emprunt.date_emprunt}</td>
                <td>{emprunt.date_retour}</td>
                <td>{status}</td>
                <td>
                    <a href={"/emprunts/supprimer?id=" + emprunt.id_emprunt}>Supprimer</a>
                </td>
            </tr>
        );
    }
    return (
        <tr>
            <td>{emprunt.livre_isbn}</td>
            <td>{emprunt.livre_titre}</td>
            <td>{emprunt.utilisateur_nom} {emprunt.utilisateur_prenom}</td>
            <td>{emprunt.date_emprunt}</td>
            <td>{emprunt.date_retour}</td>
            <td>{status}</td>
            <td>
                <a href={"/emprunts/modifier?id=" + emprunt.id_emprunt}>Rendre</a>
                <a href={"/emprunts/supprimer?id=" + emprunt.id_emprunt}>Supprimer</a>
            </td>
        </tr>
    );
};

const EmpruntsPage = ({api_url}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const [emprunts, setEmprunts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
              'username': process.env.REACT_APP_API_USERNAME,
              'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get(api_url + '/emprunts', config)
            .then(response => {
                setEmprunts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [api_url]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmprunts = emprunts.filter(emprunts =>
        emprunts.livre_titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p class="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return (
                <div>
                    <h1>Les emprunts</h1>

                    <div class="search-container">
                        <input type="text" placeholder="Rechercher un emprunt" value={searchTerm} onChange={handleSearch} />
                        <a href="/emprunts/ajouter">Ajouter un emprunt</a>
                    </div>

                    <p class="error">Aucun emprunt trouvé</p>
                </div>
            );
        }
        return <p class="error">Erreur : {error.message}</p>;
    }

    return (
        <div>
            <h1>Les emprunts</h1>

            <div class="search-container">
                <input type="text" placeholder="Rechercher un emprunt" value={searchTerm} onChange={handleSearch} />
                <a href="/emprunts/ajouter">Ajouter un emprunt</a>
            </div>

            <div class="emprunts-container">
                <table>
                    <tr>
                        <th>ISBN</th>
                        <th>Titre</th>
                        <th>Utilisateur</th>
                        <th>Date d'emprunt</th>
                        <th>Date de retour</th>
                        <th>Etat</th>
                        <th>Actions</th>
                    </tr>
                    {
                        filteredEmprunts.map((emprunt, index) => (
                            <EmpruntDiv key={index} emprunt={emprunt} />
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default EmpruntsPage;
