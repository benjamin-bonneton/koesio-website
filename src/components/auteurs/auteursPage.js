import React,  { useState } from 'react';

const AuteurDiv = ({ auteur }) => {
  return (
    <div class="auteurs-item">
        <div className='auteurs-item-content'>
            <p class="nom">{auteur.nom}</p>
            <p class="prenom">{auteur.prenom}</p>
        </div>
        <div class="auteurs-item-actions">
            <a href={"/auteurs/modifier?id=" + auteur.id}>Modifier</a>
            <a href='/'>Supprimer</a>
        </div>
    </div>
  );
};

const AuteursPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [auteurs] = useState([
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

    const filteredAuteurs = auteurs.filter(auteurs =>
        auteurs.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auteurs.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
