import React,  {useState, useEffect} from 'react';
import axios from 'axios';


const AuteurDiv = ({auteur}) => {
    return (
        <div className="auteurs-item">
            <div className='auteurs-item-content'>
                <p className="nom">{auteur.nom}</p>
                <p className="prenom">{auteur.prenom}</p>
            </div>

            <div className="auteurs-item-actions">
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

    // Obtenir la liste des auteurs
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

    // Gérer la recherche
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAuteurs = auteurs.filter(auteurs =>
        auteurs.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auteurs.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Contenu de la page
    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return (
                <div>
                    <h1>Les auteurs</h1>

                    <div className="search-container">
                        <input type="text" placeholder="Rechercher un auteur" value={searchTerm} onChange={handleSearch} />
                        <a href="/auteurs/ajouter">Ajouter un auteur</a>
                    </div>

                    <p className="error">Aucun auteur trouvé</p>
                </div>
            );
        }
        return <p className="error">Erreur : {error.message}</p>;
    }

    return (
        <div>
            <h1>Les auteurs</h1>

            <div className="search-container">
                <input type="text" placeholder="Rechercher un auteur" value={searchTerm} onChange={handleSearch} />
                <a href="/auteurs/ajouter">Ajouter un auteur</a>
            </div>

            <div className="auteurs-container">
                <div className="auteurs-list">
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
