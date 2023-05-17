import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/Favorites.css';

const Favorites = () => {
    const [cookies, setCookie] = useCookies(['favoriteGames']);
    const favoriteGames = cookies.favoriteGames || [];

    //Function to remove game from Favorites list
    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favoriteGames.filter((favorite) => favorite.id !== id);
        setCookie('favoriteGames', updatedFavorites, { path: '/' });
    };

    return (
        <div>
            <Navigation />
            <div className="title-container">
                <h2>Favorite Games</h2>
            </div>
            <div className="grid-container">
                {favoriteGames.length > 0 ? (
                    <ul className="favorite-games">
                        {favoriteGames.map((game) => (
                            <li key={game.id} className="favorite-game">
                                <Link to={`/gamedetails/${encodeURIComponent(game.name)}`} className="favorite-game-link">
                                    <img src={game.image} alt={game.title} className="favorite-game-image" />
                                    <h3 className="favorite-game-title">{game.title}</h3>
                                </Link>
                                <button className="favorite-game-button" onClick={() => handleRemoveFavorite(game.id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-message">No favorite games yet.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
