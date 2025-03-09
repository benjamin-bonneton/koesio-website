import React from 'react';

const LivresDetailsPage = () => {
    return (
        <div class="livres-details">
            <div class="details">
                <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/kindle-book-cover-business-book-cover-design-template-ca3f4b3e36c7921b98f0263db7d757ba_screen.jpg?ts=1665474961' alt='book cover' />
                <table>
                    <tr>
                        <th>Titre</th>
                        <td>Le livre</td>
                    </tr>
                    <tr>
                        <th>Auteur</th>
                        <td>Benjamin Bonneton</td>
                    </tr>
                    <tr>
                        <th>Genre</th>
                        <td>Roman</td>
                    </tr>
                    <tr>
                        <th>Nombre de pages</th>
                        <td>125</td>
                    </tr>
                    <tr>
                        <th>Date de publication</th>
                        <td>2019</td>
                    </tr>
                    <tr>
                        <th>ISBN</th>
                        <td>45416658151546</td>
                    </tr>
                </table>
            </div>
            <div class="main">
                <h1>TITRE</h1>
                <p>Description du livre</p>
            </div>
        </div>
    );
};

export default LivresDetailsPage;
