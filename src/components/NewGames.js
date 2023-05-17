import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/NewGames.css';

const NewGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchNewGames = async () => {
            try {
                const response = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        ordering: '-released',
                        key: 'cbde2235853a407382af5b7788c37b88',
                    },
                });
                const newGames = response.data.results;
                setGames(newGames.slice(0, 10)); // Only take the top 10 new games
            } catch (error) {
                console.error('Error fetching new games:', error);
            }
        };

        fetchNewGames();
    }, []);

    return (
        <div>
            <ul className="games-list">
                {games.map((game) => (
                    <li key={game.id} className="games-list-item">
                        <Link to={`/gamedetails/${encodeURIComponent(game.name)}`} className="game-link">
                            {game.background_image ? (
                                <img src={game.background_image} alt={game.name} className="game-artwork" />
                            ) : (
                                <span className="game-name">{game.name}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewGames;
