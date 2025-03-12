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
            <a href={"/auteurs/supprimer?id=" + auteur.id_auteur}>Supprimer</a>
        </div>
    </div>
  );
};

const AuteursPage = ({api_url}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const [auteurs, setAuteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            return (
                <div>
                    <h1>Les auteurs</h1>

                    <div class="search-container">
                        <input type="text" placeholder="Rechercher un auteur" value={searchTerm} onChange={handleSearch} />
                        <a href="/auteurs/ajouter">Ajouter un auteur</a>
                    </div>
                    <p class="error">Aucun auteur trouvé</p>
                </div>
            );
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
