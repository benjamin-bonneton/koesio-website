import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LivresElements = ({ genre_id }) => {
    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get('http://127.0.0.1:3001/api/v1/livres', config)
            .then(response => {
                setLivres(response.data);
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
        <select id="livre" name="livre">
            {livres.map(livre => (
                <option key={livre.id_livre} value={livre.id_livre}>
                    (ISBN {livre.isbn}) {livre.titre}
                </option>
            ))}
        </select>
    );
};

export default LivresElements;
