import React, {useState, useEffect} from 'react';
import axios from 'axios';


const LivresDetailsPage = ({api_url}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [livre, setLivre] = useState([]);
    const [googleBookDetails, setGoogleBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtenir les détails du livre
    useEffect(() => {
        const config = {
            headers: {
                'username': localStorage.getItem('username'),
                'key_pass': localStorage.getItem('key_pass')
            }
        };

        // Obtenir les détails de la base de données
        axios.get(api_url + `/livres/${id}`, config)
            .then(response => {
                setLivre(response.data);
                setLoading(false);

                // Obtenir les détails de Google Books
                const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${response.data.livre_isbn}`;
                
                axios.get(googleBooksApiUrl)
                    .then(googleResponse => {
                        if (googleResponse.data.items && googleResponse.data.items.length > 0) {
                            setGoogleBookDetails(googleResponse.data.items[0].volumeInfo);
                        }
                    })
                    .catch(googleError => {
                        console.error('Error fetching Google Books details:', googleError);
                    });
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, api_url]);

    // Contenu de la page
    if (loading) {
        return <p className="error">Chargement...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <div className="livres-details">
            <div className="details">
                <img src={googleBookDetails ? googleBookDetails.imageLinks.thumbnail : "/"} alt='Chargement...' />

                <table>
                    <tbody>
                        <tr>
                            <th>Titre</th>
                            <td>{livre.livre_titre}</td>
                        </tr>
                        <tr>
                            <th>Auteur</th>
                            <td>{livre.auteur_prenom} {livre.auteur_nom}</td>
                        </tr>
                        <tr>
                            <th>Genre</th>
                            <td>{livre.genre_nom}</td>
                        </tr>
                        <tr>
                            <th>Nombre de pages</th>
                            <td>{googleBookDetails ? googleBookDetails.pageCount : "Chargement..."}</td>
                        </tr>
                        <tr>
                            <th>Date de publication</th>
                            <td>{googleBookDetails ? googleBookDetails.publishedDate : "Chargement..."}</td>
                        </tr>
                        <tr>
                            <th>ISBN</th>
                            <td>{livre.livre_isbn}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="main">
                <h1>{livre.livre_titre}</h1>
                <p>{googleBookDetails ? googleBookDetails.description : "Chargement..."}</p>
            </div>
        </div>
    );
};


export default LivresDetailsPage;
