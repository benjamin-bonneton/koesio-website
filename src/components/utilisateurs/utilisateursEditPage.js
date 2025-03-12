import React, {useState, useEffect} from 'react';
import axios from 'axios';


const UtilisateursEditPage = ({api_url}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtenir les informations de l'utilisateur
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.get(api_url + `/utilisateurs/${id}`, config)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, api_url]);

    // Gérer l'envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            prenom: formData.get('prenom'),
            nom: formData.get('nom'),
        };

        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.put(api_url + `/utilisateurs/${id}`, data, config)
            .then(response => {
                window.location.href = '/utilisateurs';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    // Contenu de la page
    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <div>
            <h1>Modifier un utilisateur</h1>

            <div className="form-add-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id="nom" name="nom" defaultValue={user.nom} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" defaultValue={user.prenom} />
                    </div>

                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};


export default UtilisateursEditPage;
