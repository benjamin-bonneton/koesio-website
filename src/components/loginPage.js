import React from 'react';
import axios from 'axios';


const LoginPage = ({api_url}) => {

    // Envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            key_pass: formData.get('password')
        };

        axios.post(api_url + `/login`, data)
            .then(response => {
                // Enregistrement des données
                localStorage.setItem('username', data.username);
                localStorage.setItem('key_pass', data.key_pass);
                
                window.location.href = '/utilisateurs';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    // Contenu de la page
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" name="username" id="username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" required />
                </div>
                
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};


export default LoginPage;
