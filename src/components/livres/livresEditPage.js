import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';

const LivresEditPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get(`http://127.0.0.1:3001/api/v1/livres/${id}`, config)
            .then(response => {
                setLivres(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

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
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.put(`http://127.0.0.1:3001/api/v1/livres/${id}`, data, config)
            .then(response => {
                alert('Livre modifié avec succès!');
                e.target.reset();
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <div>
            <h1>Modifier un livre</h1>

            <div class="livres-add-container">
                <form onSubmit={handleSubmit} class="livres-add-form">
                    <div class="form-group">
                        <label for="titre">Titre</label>
                        <input type="text" id="titre" name="titre" defaultValue={livres[0].titre} />
                    </div>

                    <div class="form-group">
                        <label for="isbn">ISBN</label>
                        <input type="text" id="isbn" name="isbn" defaultValue={livres[0].isbn} />
                    </div>
                    
                    <div class="form-group">
                        <label for="auteur">Auteur</label>
                        <AuteursElements />
                    </div>

                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <GenresElements/>
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};

export default LivresEditPage;
