import React,  {useState, useEffect} from 'react';
import axios from 'axios';
import GenresElements from '../data/genres';
import AuteursElements from '../data/auteurs';

const LivreDiv = ({ livre }) => {
  return (
    <div class="livres-item">
        <div class="livres-item-content">
            <h3>{livre.titre} <br /> (ISBN {livre.isbn})</h3>
            <p class="genre">
                Genre :<br/>
                {livre.genre_nom}
            </p>
            <p>
                Auteur :<br/>
                {livre.auteur_nom} {livre.auteur_prenom}
            </p>
        </div>
        <div class="livres-item-actions">
            <a href={"/livres/details?id=" + livre.id_livre}>Voir</a>
            <a href={"/livres/modifier?id=" + livre.id_livre}>Modifier</a>
            <a href={"/livres/supprimer?id=" + livre.id_livre}>Supprimer</a>
        </div>
    </div>
  );
};

const LivresPage = ({api_url}) => {
    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            id_genre: formData.get('genre_checkbox') ? formData.get('genre') : null,
            id_auteur: formData.get('auteur_checkbox') ? formData.get('auteur') : null
        };

        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            },
            params: data
        };

        axios.get(api_url + `/livres`, config)
            .then(response => {
                setLivres(response.data);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    if (loading) {
        return <p class="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return (
                <div>
                    <h1>Les livres</h1>

                    <div class="search-container">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="checkbox" id="genre_checkbox" name="genre_checkbox"/>
                                <GenresElements api_url={api_url} />
                            </div>
                            <div>
                                <input type="checkbox" id="auteur_checkbox" name="auteur_checkbox"/>
                                <AuteursElements api_url={api_url}/>
                            </div>
                            <button type="submit">Rechercher</button>
                        </form>
                        
                        <a href="/livres/ajouter">Ajouter un livre</a>
                    </div>

                    <p class="error">Aucun livre trouvé</p>
                </div>
            );
        }
        return <p class="error">Erreur : {error.message}</p>;
    }

    return (
        <div>
            <h1>Les livres</h1>

            <div class="search-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="checkbox" id="genre_checkbox" name="genre_checkbox"/>
                        <GenresElements api_url={api_url} />
                    </div>
                    <div>
                        <input type="checkbox" id="auteur_checkbox" name="auteur_checkbox"/>
                        <AuteursElements api_url={api_url}/>
                    </div>
                    <button type="submit">Rechercher</button>
                </form>
                
                <a href="/livres/ajouter">Ajouter un livre</a>
            </div>

            <div class="livres-container">
                <div class="livres-list">
                    {
                        livres.map((livre, index) => (
                            <LivreDiv key={index} livre={livre} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default LivresPage;
