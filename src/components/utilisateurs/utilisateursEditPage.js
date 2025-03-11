import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UtilisateursEditPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get(`http://127.0.0.1:3001/api/v1/utilisateurs/${id}`, config)
            .then(response => {
                setUsers(response.data);
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
            nom: formData.get('nom'),
        };

        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.put(`http://127.0.0.1:3001/api/v1/utilisateurs/${id}`, data, config)
            .then(response => {
                alert('Utilisateur modifié avec succès!');
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
            <h1>Modifier un utilisateur</h1>

            <div class="utilisateurs-add-container">
                <form onSubmit={handleSubmit} class="utilisateurs-add-form">
                    <div class="form-group">
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" name="nom" defaultValue={users.nom} />
                    </div>
                    <div class="form-group">
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" defaultValue={users.prenom} />
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};

export default UtilisateursEditPage;
