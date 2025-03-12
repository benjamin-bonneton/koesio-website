import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersElements = ({api_url}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.get(api_url + '/utilisateurs', config)
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [api_url]);

    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <select id="utilisateur" name="utilisateur">
            {users.map(user => (
                <option key={user.id_utilisateur} value={user.id_utilisateur}> {user.nom} {user.prenom}</option>
            ))}
        </select>
    );
};

export default UsersElements;