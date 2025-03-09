import React from 'react';

const AuteursAddPage = () => {
    return (
        <div>
            <h1>Ajouter un auteur</h1>

            <div class="auteurs-add-container">
                <form action="#" method="post" class="auteurs-add-form">
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

export default AuteursAddPage;
