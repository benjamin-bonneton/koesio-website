import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';


const LivresEditPage = ({api_url}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [livre, setLivre] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les informations du livre
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.get(api_url + `/livres/${id}`, config)
            .then(response => {
                setLivre(response.data);
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
            titre: formData.get('titre'),
            isbn: formData.get('isbn'),
            id_auteur: formData.get('auteur'),
            id_genre: formData.get('genre')
        };

        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.put(api_url + `/livres/${id}`, data, config)
            .then(response => {
                window.location.href = '/livres';
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
            <h1>Modifier un livre</h1>

            <div className="form-add-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titre">Titre</label>
                        <input type="text" id="titre" name="titre" defaultValue={livre.livre_titre} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input type="text" id="isbn" name="isbn" defaultValue={livre.livre_isbn} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="auteur">Auteur</label>
                        <AuteursElements api_url={api_url} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <GenresElements api_url={api_url} />
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};


export default LivresEditPage;
