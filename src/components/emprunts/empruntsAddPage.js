import React from 'react';
import axios from 'axios';
import LivresElements from '../data/livres';
import UtilisateursElements from '../data/utilisateurs';

const EmpruntsAddPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            id_livre: formData.get('livre'),
            id_utilisateur: formData.get('utilisateur')
        };

        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.post(`http://127.0.0.1:3001/api/v1/emprunts`, data, config)
            .then(response => {
                alert('Emprunt ajouté avec succès!');
                e.target.reset();
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <div>
            <h1>Ajouter un emprunt</h1>

            <div class="emprunts-add-container">
                <form onSubmit={handleSubmit} class="emprunts-add-form">
                    <div class="form-group">
                        <label for="livre">Livre</label>
                        <LivresElements />
                    </div>

                    <div class="form-group">
                        <label for="utilisateur">Utilisateur</label>
                        <UtilisateursElements />
                    </div>
                    
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default EmpruntsAddPage;
