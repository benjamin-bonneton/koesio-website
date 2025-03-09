import React from 'react';

const UtilisateursAddPage = () => {
    return (
        <div>
            <h1>Ajouter un utilisateur</h1>

            <div class="utilisateurs-add-container">
                <form action="#" method="post" class="utilisateurs-add-form">
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
