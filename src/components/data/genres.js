import React, {useState, useEffect} from 'react';
import axios from 'axios';


const GenresElements = ({api_url}) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtenir les genres
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.get(api_url + '/genres', config)
            .then(response => {
                setGenres(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [api_url]);

    // Contenu du composant
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
