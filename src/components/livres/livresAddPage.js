import React from 'react';
import axios from 'axios';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';


const LivresAddPage = ({api_url}) => {
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

        axios.post(api_url + '/livres', data, config)
            .then(response => {
                window.location.href = '/livres';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    // Contenu de la page
    return (
        <div>
            <h1>Ajouter un livre</h1>

            <div className="form-add-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titre">Titre</label>
                        <input type="text" id="titre" name="titre" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input type="text" id="isbn" name="isbn" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="auteur">Auteur</label>
                        <AuteursElements api_url={api_url} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <GenresElements api_url={api_url} />
                    </div>

                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};


export default LivresAddPage;
