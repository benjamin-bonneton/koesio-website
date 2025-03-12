import React from 'react';
import axios from 'axios';
import LivresElements from '../data/livres';
import UtilisateursElements from '../data/utilisateurs';


const EmpruntsAddPage = ({api_url}) => {
    // Gérer l'envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            id_livre: formData.get('livre'),
            id_utilisateur: formData.get('utilisateur')
        };

        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.post(api_url + `/emprunts`, data, config)
            .then(response => {
                window.location.href = '/emprunts';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    // Contenu de la page
    return (
        <div>
            <h1>Ajouter un emprunt</h1>

            <div className="form-add-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="livre">Livre</label>
                        <LivresElements api_url={api_url} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="utilisateur">Utilisateur</label>
                        <UtilisateursElements api_url={api_url}/>
                    </div>
                    
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};


export default EmpruntsAddPage;
