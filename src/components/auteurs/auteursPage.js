import React,  {useState, useEffect} from 'react';
import axios from 'axios';

const AuteurDiv = ({ auteur }) => {
  return (
    <div class="auteurs-item">
        <div className='auteurs-item-content'>
            <p class="nom">{auteur.nom}</p>
            <p class="prenom">{auteur.prenom}</p>
        </div>
        <div class="auteurs-item-actions">
            <a href={"/auteurs/modifier?id=" + auteur.id_auteur}>Modifier</a>
            <a href='/'>Supprimer</a>
        </div>
    </div>
  );
};

const AuteursPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAuteurs = auteurs.filter(auteurs =>
        auteurs.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auteurs.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p class="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return <p class="error">Aucun auteur trouvé</p>;
        }
        return <p class="error">Erreur : {error.message}</p>;
    }

    return (
        <div>
            <h1>Les auteurs</h1>

            <div class="search-container">
                <input type="text" placeholder="Rechercher un auteur" value={searchTerm} onChange={handleSearch} />
                <a href="/auteurs/ajouter">Ajouter un auteur</a>
            </div>

            <div class="auteurs-container">
                <div class="auteurs-list">
                    {
                        filteredAuteurs.map((auteur, index) => (
                            <AuteurDiv key={index} auteur={auteur} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AuteursPage;
