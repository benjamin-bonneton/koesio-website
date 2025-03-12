import React from 'react';
import axios from 'axios';


const UtilisateursAddPage = ({api_url}) => {
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

        axios.post(api_url + `/utilisateurs`, data, config)
            .then(response => {
                window.location.href = '/utilisateurs';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    // Contenu de la page
    return (
        <div>
            <h1>Ajouter un utilisateur</h1>

            <div className="form-add-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id="nom" name="nom" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" />
                    </div>

                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};


export default UtilisateursAddPage;
