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
            <a href='/'>Supprimer</a>
        </div>
    </div>
  );
};

const UtilisateursPage = () => {
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

        axios.get('http://127.0.0.1:3001/api/v1/utilisateurs', config)
            .then(response => {
                setUsers(response.data);
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

    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
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
