import React from 'react';
import axios from 'axios';

const HomePage = ({api_url}) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            key_pass: formData.get('password')
        };

        axios.post(api_url + `/login`, data)
            .then(response => {
                localStorage.setItem('username', data.username);
                localStorage.setItem('key_pass', data.key_pass);
                window.location.href = '/utilisateurs';
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <div>
            <div class="login-container">
                <form onSubmit={handleSubmit} class="login-form">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur</label>
                        <input type="text" name="username" id="username" required />
                    </div>

                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
