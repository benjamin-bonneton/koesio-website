import React from 'react';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';

const LivresAddPage = () => {
    return (
        <div>
            <h1>Ajouter un livre</h1>

            <div className="livres-add-container">
                <form action="#" method="post" className="livres-add-form">
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
