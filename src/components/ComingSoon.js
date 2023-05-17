import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ComingSoon.css';

const ComingSoon = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchComingSoonGames = async () => {
            try {
                const response = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        dates: '2023-05-16,2023-12-31',
                        ordering: '-added',
                        key: 'cbde2235853a407382af5b7788c37b88',
                    },
                });
                const comingSoonGames = response.data.results;
                //Takes the top 10 games
                setGames(comingSoonGames.slice(0, 10));
            } catch (error) {
                console.error('Error fetching coming soon games:', error);
            }
        };

        fetchComingSoonGames();
    }, []);

    return (
        <div>
            <ul className="games-list">
                {games.map((game) => (
                    <li key={game.id} className="games-list-item">
                        <Link to={`/gamedetails/${encodeURIComponent(game.name)}`} className="game-link">
                            <img src={game.background_image} alt={game.name} className="game-artwork" />
                            <span className="game-name">{game.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComingSoon;
