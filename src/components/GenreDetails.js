import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import '../styles/GenreDetails.css';

const GenreDetails = () => {
    const { id } = useParams();
    const [genreName, setGenreName] = useState('');
    const [genreGames, setGenreGames] = useState([]);

    useEffect(() => {
        const fetchGenreDetails = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/genres/${id}?key=cbde2235853a407382af5b7788c37b88`);
                const genreData = response.data;
                setGenreName(genreData.name);
            } catch (error) {
                console.error('Error fetching genre details:', error);
            }
        };

        const fetchGenreGames = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/games?key=cbde2235853a407382af5b7788c37b88&genres=${id}`);
                const data = response.data.results;
                setGenreGames(data);
            } catch (error) {
                console.error('Error fetching genre games:', error);
            }
        };

        fetchGenreDetails();
        fetchGenreGames();
    }, [id]);

    return (
        <div>
            <Navigation />
            {genreName && <h2>{genreName}</h2>}
            <div className="games-container">
                {genreGames.map((game) => (
                    <div key={game.id} className="game-card">
                        <Link to={`/gamedetails/${encodeURIComponent(game.name)}`} className="game-link">
                            <img src={game.background_image} alt={game.name} className="game-artwork" />
                            <span className="game-name">{game.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreDetails;
