import React from 'react';

const UtilisateursEditPage = () => {
    return (
        <div>
            <h1>Modifier un utilisateur</h1>

            <div class="utilisateurs-add-container">
                <form action="#" method="post" class="utilisateurs-add-form">
                    <div class="form-group">
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" name="nom" value="" />
                    </div>
                    <div class="form-group">
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" value="" />
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
};

export default UtilisateursEditPage;
