import React from 'react';

const EmpruntsEditPage = () => {
    return (
        <div>
            <h1>Modifier un emprunt</h1>

            <div class="emprunts-add-container">
                <form action="#" method="post" class="emprunts-add-form">
                    <div class="form-group">
                        <label for="livre">Livre</label>
                        <select id="livre" name="livre">
                            <option value="1">Livre 1</option>
                            <option value="2">Livre 2</option>
                            <option value="3">Livre 3</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="utilisateur">Utilisateur</label>
                        <select id="utilisateur" name="utilisateur">
                            <option value="1">Utilisateur 1</option>
                            <option value="2">Utilisateur 2</option>
                            <option value="3">Utilisateur 3</option>
                        </select>
                    </div>
                    
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default EmpruntsEditPage;
