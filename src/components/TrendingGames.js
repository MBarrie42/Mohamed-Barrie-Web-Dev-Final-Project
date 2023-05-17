import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/TrendingGames.css';

const TrendingGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchTrendingGames = async () => {
            try {
                const response = await axios.get(
                    'https://api.rawg.io/api/games/lists/main',
                    {
                        params: {
                            key: 'cbde2235853a407382af5b7788c37b88',
                        },
                    }
                );
                const trendingGames = response.data.results;
                const uniqueGames = removeDuplicates(trendingGames.slice(0, 10), 'id');
                setGames(uniqueGames);
            } catch (error) {
                console.error('Error fetching trending games:', error);
            }
        };

        fetchTrendingGames();
    }, []);

    // Function to remove duplicates from an array of objects based on a specific property
    const removeDuplicates = (array, key) => {
        const uniqueKeys = new Set();
        return array.filter((game) => {
            if (uniqueKeys.has(game[key])) {
                return false;
            }
            uniqueKeys.add(game[key]);
            return true;
        });
    };

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

export default TrendingGames;
