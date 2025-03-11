import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuteursElements = () => {
    const [auteurs, setAuteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get('http://127.0.0.1:3001/api/v1/auteurs', config)
            .then(response => {
                setAuteurs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <select id="auteur" name="auteur">
            {auteurs.map(auteur => (
                <option key={auteur.id_auteur} value={auteur.id_auteur}>{auteur.nom} {auteur.prenom}</option>
            ))}
        </select>
    );
};

export default AuteursElements;