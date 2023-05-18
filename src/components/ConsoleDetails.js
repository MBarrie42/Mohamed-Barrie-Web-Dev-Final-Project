import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import '../styles/ConsoleDetails.css';

const ConsoleDetails = () => {
    const { id } = useParams();
    const [consoleName, setConsoleName] = useState('');
    const [consoleGames, setConsoleGames] = useState([]);


    useEffect(() => {
        //Fetch console platforms for title name
        const fetchConsoleDetails = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/platforms/${id}?key=cbde2235853a407382af5b7788c37b88`);
                const consoleData = response.data;
                setConsoleName(consoleData.name);
            } catch (error) {
                console.error('Error fetching console details:', error);
            }
        };

        //Fetch games from said console
        const fetchConsoleGames = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/games?key=cbde2235853a407382af5b7788c37b88&platforms=${id}`);
                const data = response.data.results;
                setConsoleGames(data);
            } catch (error) {
                console.error('Error fetching console games:', error);
            }
        };
        fetchConsoleDetails();
        fetchConsoleGames();
    }, [id]);

    return (
        <div>
            <Navigation />
            {consoleName && <h2>{consoleName}</h2>}
            <div className="games-container">
                {consoleGames.map((game) => (
                    <div key={game.id} className="game-card">
                        <Link to={`/gamedetails/${encodeURIComponent(game.name)}`} className="game-link">
                            <div className="game-image-container">
                                <img src={game.background_image} alt={game.name} className="game-image" />
                            </div>
                            <div className="game-details">
                                <span className="game-name">{game.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsoleDetails;
