import React from 'react';
import axios from 'axios';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';

const LivresAddPage = () => {
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

        axios.post('http://127.0.0.1:3001/api/v1/livres', data, config)
            .then(response => {
                alert('Livre ajouté avec succès!');
                e.target.reset();
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };


    return (
        <div>
            <h1>Ajouter un livre</h1>

            <div className="livres-add-container">
                <form onSubmit={handleSubmit} className="livres-add-form">
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
                        <AuteursElements />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <GenresElements />
                    </div>

                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default LivresAddPage;
