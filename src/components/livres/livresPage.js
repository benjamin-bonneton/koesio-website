import React,  { useState } from 'react';

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
    const [livres] = useState([
        { id: 1, titre: 'Nom du livre 1', id_genre: 1, id_auteur: 1 },
        { id: 2, titre: 'Nom du livre 2', id_genre: 1, id_auteur: 1 },
        { id: 3, titre: 'Nom du livre 3', id_genre: 1, id_auteur: 1 },
    ]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredLivres = livres.filter(livres =>
        livres.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
