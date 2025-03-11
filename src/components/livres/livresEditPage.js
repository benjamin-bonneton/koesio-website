import React from 'react';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';

const LivresEditPage = () => {
    return (
        <div>
            <h1>Modifier un livre</h1>

            <div class="livres-add-container">
                <form action="#" method="post" class="livres-add-form">
                    <div class="form-group">
                        <label for="titre">Titre</label>
                        <input type="text" id="titre" name="titre" />
                    </div>

                    <div class="form-group">
                        <label for="isbn">ISBN</label>
                        <input type="text" id="isbn" name="isbn" />
                    </div>
                    
                    <div class="form-group">
                        <label for="auteur">Auteur</label>
                        <AuteursElements />
                    </div>

                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <GenresElements />
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};

export default LivresEditPage;
