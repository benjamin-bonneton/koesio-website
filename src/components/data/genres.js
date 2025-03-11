import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenresElements = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'username': process.env.REACT_APP_API_USERNAME,
                'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get('http://127.0.0.1:3001/api/v1/genres', config)
            .then(response => {
                setGenres(response.data);
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
        <select id="genre" name="genre">
            {genres.map(genre => (
                <option key={genre.id_genre} value={genre.id_genre}>{genre.nom}</option>
            ))}
        </select>
    );
};

export default GenresElements;