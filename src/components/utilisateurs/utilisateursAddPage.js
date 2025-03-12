import React from 'react';
import axios from 'axios';

const UtilisateursAddPage = ({api_url}) => {
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

        axios.post(api_url + `/utilisateurs`, data, config)
            .then(response => {
                window.location.href = '/utilisateurs';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <div>
            <h1>Ajouter un utilisateur</h1>

            <div class="utilisateurs-add-container">
                <form onSubmit={handleSubmit} method="post" class="utilisateurs-add-form">
                    <div class="form-group">
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" name="nom" />
                    </div>
                    <div class="form-group">
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default UtilisateursAddPage;
