import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuteursEditPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [auteurs, setAuteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get(`http://127.0.0.1:3001/api/v1/auteurs/${id}`, config)
            .then(response => {
                setAuteurs(response.data);
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
            prenom: formData.get('prenom'),
            nom: formData.get('nom')
        };

        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.put(`http://127.0.0.1:3001/api/v1/auteurs/${id}`, data, config)
            .then(response => {
                alert('Auteur modifié avec succès!');
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
            <h1>Modifier un auteur</h1>

            <div class="auteurs-add-container">
                <form onSubmit={handleSubmit} class="auteurs-add-form">
                    <div class="form-group">
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" name="nom" defaultValue={auteurs.nom} />
                    </div>
                    <div class="form-group">
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" defaultValue={auteurs.prenom} />
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};

export default AuteursEditPage;
