import React, {useState, useEffect} from 'react';
import axios from 'axios';


const AuteursElements = ({api_url}) => {
    const [auteurs, setAuteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Obtenir les auteurs
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        axios.get(api_url + '/auteurs', config)
            .then(response => {
                setAuteurs(response.data);
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
        <select id="auteur" name="auteur">
            {auteurs.map(auteur => (
                <option key={auteur.id_auteur} value={auteur.id_auteur}>{auteur.nom} {auteur.prenom}</option>
            ))}
        </select>
    );
};


export default AuteursElements;
