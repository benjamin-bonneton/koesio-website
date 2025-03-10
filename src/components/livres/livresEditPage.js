import React from 'react';

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
                        <select id="auteur" name="auteur">
                            <option value="1">Genre 1</option>
                            <option value="2">Genre 2</option>
                            <option value="3">Genre 3</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="titre">Genre</label>
                        <select id="genre" name="genre">
                            <option value="1">Genre 1</option>
                            <option value="2">Genre 2</option>
                            <option value="3">Genre 3</option>
                        </select>
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default LivresEditPage;
