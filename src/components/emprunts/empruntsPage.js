import React,  {useState, useEffect} from 'react';
import axios from 'axios';
import LivresElements from '../data/livres';
import UtilisateursElements from '../data/utilisateurs';

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
    const [emprunts, setEmprunts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            id_livre: formData.get('livre_checkbox') ? formData.get('livre') : null,
            id_utilisateur: formData.get('utilisateur_checkbox') ? formData.get('utilisateur') : null,
            en_cours: formData.get('en_cours') ? "true" : null
        };

        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            },
            params: data
        };

        axios.get(api_url + `/emprunts`, config)
            .then(response => {
                setEmprunts(response.data);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    if (loading) {
        return <p class="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return (
                <div>
                    <h1>Les emprunts</h1>

                    <div class="search-container">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="checkbox" id="livre_checkbox" name="livre_checkbox"/>
                                <LivresElements api_url={api_url} />
                            </div>
                            <div>
                                <input type="checkbox" id="utilisateur_checkbox" name="utilisateur_checkbox"/>
                                <UtilisateursElements api_url={api_url}/>
                            </div>
                            <div>
                                <input type="checkbox" id="en_cours" name="en_cours"/>
                                <label for="en_cours">En cours</label>
                            </div>
                            <button type="submit">Rechercher</button>
                        </form>
                        
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="checkbox" id="livre_checkbox" name="livre_checkbox"/>
                        <LivresElements api_url={api_url} />
                    </div>
                    <div>
                        <input type="checkbox" id="utilisateur_checkbox" name="utilisateur_checkbox"/>
                        <UtilisateursElements api_url={api_url}/>
                    </div>
                    <div>
                        <input type="checkbox" id="en_cours" name="en_cours"/>
                        <label for="en_cours">En cours</label>
                    </div>
                    <button type="submit">Rechercher</button>
                </form>
                
                <a href="/emprunts/ajouter">Ajouter un emprunt</a>
            </div>

            <div class="emprunts-container">
                <table>
                    <tbody>
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
                            emprunts.map((emprunt, index) => (
                                <EmpruntDiv key={index} emprunt={emprunt} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmpruntsPage;
