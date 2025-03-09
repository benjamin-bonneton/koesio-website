import React,  { useState } from 'react';

const UserDiv = ({ user }) => {
  return (
    <div class="utilisateurs-item">
        <div className='utilisateurs-item-content'>
            <p class="nom">{user.nom}</p>
            <p class="prenom">{user.prenom}</p>
        </div>
        <div class="utilisateurs-item-actions">
            <a href={"/utilisateurs/modifier?id=" + user.id}>Modifier</a>
            <a href='/'>Supprimer</a>
        </div>
    </div>
  );
};

const UtilisateursPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users] = useState([
        { nom: 'John', prenom: 'Doe', id: 1 },
        { nom: 'Jane', prenom: 'Smith', id: 2 },
        { nom: 'Alice', prenom: 'Johnson', id: 3 },
        { nom: 'Bob', prenom: 'Brown', id: 4 },
        { nom: 'Charlie', prenom: 'Davis', id: 5 },
        { nom: 'Eve', prenom: 'Wilson', id: 6 },
        { nom: 'Frank', prenom: 'Taylor', id: 7 },
        { nom: 'Grace', prenom: 'Martinez', id: 8 },
        { nom: 'Henry', prenom: 'Anderson', id: 9 },
        { nom: 'Isabel', prenom: 'Thomas', id: 10 }
    ]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
