import React,  { useState } from 'react';

const EmpruntDiv = ({ emprunt }) => {
  return (
    <tr>
        <td>{emprunt.isbn}</td>
        <td>{emprunt.titre}</td>
        <td>{emprunt.utilisateur}</td>
        <td>{emprunt.date_emprunt}</td>
        <td>{emprunt.date_retour}</td>
        <td>{emprunt.etat}</td>
        <td>
            <a href={"/emprunts/modifier?id=" + emprunt.id}>Modifier</a>
            <a href='/'>Supprimer</a>
        </td>
    </tr>
  );
};

const EmpruntsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [emprunts] = useState([
        { id: 1, isbn: '123', titre: 'Livre 1', utilisateur: 'Benjamin', date_emprunt: '2025-01-01', date_retour: '-', etat: 'En cours' },
        { id: 2, isbn: '124', titre: 'Livre 2', utilisateur: 'Benji', date_emprunt: '2025-02-01', date_retour: '-', etat: 'En cours' }
    ]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmprunts = emprunts.filter(emprunts =>
        emprunts.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Les emprunts</h1>

            <div class="search-container">
                <input type="text" placeholder="Rechercher un emprunt" value={searchTerm} onChange={handleSearch} />
                <a href="/emprunts/ajouter">Ajouter un emprunt</a>
            </div>

            <div class="emprunts-container">
                <table>
                    <tr>
                        <th>ISBN</th>
                        <th>Titre</th>
                        <th>Utilisateur</th>
                        <th>Date d'emprunt</th>
                        <th>Date de retour</th>
                        <th>Etat</th>
                        <th>Actions</th>
                    </tr>
                    {
                        filteredEmprunts.map((emprunt, index) => (
                            <EmpruntDiv key={index} emprunt={emprunt} />
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default EmpruntsPage;
