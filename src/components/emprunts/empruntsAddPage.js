import React from 'react';
import LivresElements from '../data/livres';
import UtilisateursElements from '../data/utilisateurs';

const EmpruntsAddPage = () => {
    return (
        <div>
            <h1>Ajouter un emprunt</h1>

            <div class="emprunts-add-container">
                <form action="#" method="post" class="emprunts-add-form">
                    <div class="form-group">
                        <label for="livre">Livre</label>
                        <LivresElements />
                    </div>

                    <div class="form-group">
                        <label for="utilisateur">Utilisateur</label>
                        <UtilisateursElements />
                    </div>
                    
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default EmpruntsAddPage;
