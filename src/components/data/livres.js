import React, {useState, useEffect} from 'react';
import axios from 'axios';


const LivresElements = ({api_url}) => {
    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtenir les livres
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.get(api_url + '/livres', config)
            .then(response => {
                setLivres(response.data);
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
        <select id="livre" name="livre">
            {livres.map(livre => (
                <option key={livre.id_livre} value={livre.id_livre}>(ISBN {livre.isbn}) {livre.titre}</option>
            ))}
        </select>
    );
};


export default LivresElements;
