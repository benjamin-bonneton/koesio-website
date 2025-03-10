import React,  {useState, useEffect} from 'react';
import axios from 'axios';

const LivreDiv = ({ livre }) => {
  return (
    <div class="livres-item">
        <div class="livres-item-content">
            <h3>{livre.titre}</h3>
            <p class="genre">
                Genre :<br/>
                {livre.id_genre}
            </p>
            <p>
                Auteur :<br/>
                {livre.id_auteur}
            </p>
        </div>
        <div class="livres-item-actions">
            <a href={"/livres/details?id=" + livre.id}>Voir</a>
            <a href={"/livres/modifier?id=" + livre.id}>Modifier</a>
            <a href='/'>Supprimer</a>
        </div>
    </div>
  );
};

const LivresPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredLivres = livres.filter(livres =>
        livres.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    return (
        <div>
            <h1>Les livres</h1>

            <div class="search-container">
                <input type="text" placeholder="Rechercher un livre" value={searchTerm} onChange={handleSearch} />
                <a href="/livres/ajouter">Ajouter un livre</a>
            </div>

            <div class="livres-container">
                <div class="livres-list">
                    {
                        filteredLivres.map((livre, index) => (
                            <LivreDiv key={index} livre={livre} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default LivresPage;
