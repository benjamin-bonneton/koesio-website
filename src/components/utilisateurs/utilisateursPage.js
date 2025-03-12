import React,  {useState, useEffect} from 'react';
import axios from 'axios';


const UserDiv = ({user}) => {
    return (
        <div className="utilisateurs-item">
            <div className='utilisateurs-item-content'>
                <p className="nom">{user.nom}</p>
                <p className="prenom">{user.prenom}</p>
            </div>
            <div className="utilisateurs-item-actions">
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

    // Obtenir les utilisateurs
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
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

    // Rechercher un utilisateur
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Contenu de la page
    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        if (error.response.status === 404) {
            return (
                <div>
                    <h1>Les utilisateurs</h1>

                    <div className="search-container">
                        <input type="text" placeholder="Rechercher un utilisateur" value={searchTerm} onChange={handleSearch} />
                        <a href="/utilisateurs/ajouter">Ajouter un utilisateur</a>
                    </div>
                    <p className="error">Aucun utilisateur trouvé</p>
                </div>
            );
        }
        return <p className="error">Erreur : {error.message}</p>;
    }

    return (
        <div>
            <h1>Les utilisateurs</h1>

            <div className="search-container">
                <input type="text" placeholder="Rechercher un utilisateur" value={searchTerm} onChange={handleSearch} />
                <a href="/utilisateurs/ajouter">Ajouter un utilisateur</a>
            </div>

            <div className="utilisateurs-container">
                <div className="utilisateurs-list">
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
