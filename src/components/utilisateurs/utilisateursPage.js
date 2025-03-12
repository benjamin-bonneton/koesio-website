import React,  {useState, useEffect} from 'react';
import axios from 'axios';

const UserDiv = ({ user }) => {
  return (
    <div class="utilisateurs-item">
        <div className='utilisateurs-item-content'>
            <p class="nom">{user.nom}</p>
            <p class="prenom">{user.prenom}</p>
        </div>
        <div class="utilisateurs-item-actions">
            <a href={"/utilisateurs/modifier?id=" + user.id_utilisateur}>Modifier</a>
            <a href={"/utilisateurs/supprimer?id=" + user.id_utilisateur} >Supprimer</a>
        </div>
    </div>
  );
};

const UtilisateursPage = ({api_url}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
              'username': process.env.REACT_APP_API_USERNAME,
              'key_pass': process.env.REACT_APP_API_KEY_PASS
            }
        };

        axios.get(api_url + '/utilisateurs', config)
            .then(response => {
                setUsers(response.data);
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

    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p class="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return (
                <div>
                    <h1>Les utilisateurs</h1>

                    <div class="search-container">
                        <input type="text" placeholder="Rechercher un utilisateur" value={searchTerm} onChange={handleSearch} />
                        <a href="/utilisateurs/ajouter">Ajouter un utilisateur</a>
                    </div>
                    <p class="error">Aucun utilisateur trouvé</p>
                </div>
            );
        }
        return <p class="error">Erreur : {error.message}</p>;
    }

    return (
        <div>
            <h1>Les utilisateurs</h1>

            <div class="search-container">
                <input type="text" placeholder="Rechercher un utilisateur" value={searchTerm} onChange={handleSearch} />
                <a href="/utilisateurs/ajouter">Ajouter un utilisateur</a>
            </div>

            <div class="utilisateurs-container">
                <div class="utilisateurs-list">
                    {
                        filteredUsers.map((user, index) => (
                            <UserDiv key={index} user={user} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default UtilisateursPage;
