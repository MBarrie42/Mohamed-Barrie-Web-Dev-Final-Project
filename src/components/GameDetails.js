import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import { useCookies } from 'react-cookie';
import '../styles/GameDetails.css';

const GameDetails = () => {
    const { gameName } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [cookies, setCookie] = useCookies(['favoriteGames']);
    const favoriteGames = cookies.favoriteGames || [];

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.rawg.io/api/games?key=cbde2235853a407382af5b7788c37b88&search=${encodeURIComponent(
                        gameName
                    )}`
                );
                const data = response.data.results;
                if (data.length > 0) {
                    const gameSlug = data[0].slug;
                    const gameDetailsResponse = await axios.get(
                        `https://api.rawg.io/api/games/${gameSlug}?key=cbde2235853a407382af5b7788c37b88`
                    );
                    setGameDetails(gameDetailsResponse.data);
                } else {
                    setGameDetails(null);
                }
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };

        fetchGameDetails();
    }, [gameName]);

    const isFavorite = favoriteGames.some((favorite) => favorite.id === gameDetails?.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            // Remove the game from favorites list
            const updatedFavorites = favoriteGames.filter((favorite) => favorite.id !== gameDetails.id);
            setCookie('favoriteGames', updatedFavorites, { path: '/' });
        } else {
            // Add the game to favorites list
            const newFavorite = {
                id: gameDetails.id,
                title: gameDetails.name,
                description: gameDetails.description_raw,
                image: gameDetails.background_image
            };
            const updatedFavorites = [...favoriteGames, newFavorite];
            setCookie('favoriteGames', updatedFavorites, { path: '/' });
        }
    };


    return (
        <div>
            <Navigation />
            {gameDetails ? (
                <div>
                    <h2>{gameDetails.name}</h2>
                    <div className="game-details-container">
                        <img src={gameDetails.background_image} alt={gameDetails.name} />
                        <div className="game-info">
                            <h3>Description</h3>
                            <p>{gameDetails.description_raw}</p>
                            <h3>Consoles</h3>
                            {gameDetails.platforms && (
                                <p>
                                    {gameDetails.platforms.map((platform) => platform.platform.name).join(', ')}
                                </p>
                            )}
                            <h3>Genre</h3>
                            {gameDetails.genres && (
                                <p>{gameDetails.genres.map((genre) => genre.name).join(', ')}</p>
                            )}
                        </div>
                    </div>
                    <button className="favorite-button" onClick={handleFavoriteToggle}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            ) : (
                <h2>Loading</h2>
            )}
        </div>
    );
};

export default GameDetails;
