import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import '../styles/SearchPage.css';

const SearchPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(
                    `https://api.rawg.io/api/games?search=${encodeURIComponent(searchTerm)}&key=cbde2235853a407382af5b7788c37b88`
                );
                const results = response.data.results;
                setSearchResults(results);
            } catch (error) {
                console.error('Error searching games:', error);
            }
        };

        if (!searchTerm) {
            // Redirect to homepage if no search term is provided
            navigate('/');
        } else {
            fetchSearchResults();
        }
    }, [navigate, searchTerm]);

    return (
        <div>
            <Navigation />
            <div className="search-results-container">
                <h2>Search Results for "{searchTerm}"</h2>
                {searchResults.length > 0 ? (
                    <ul className="game-list">
                        {searchResults.map((game) => (
                            <li key={game.id} className="game-item">
                                <Link to={`/gamedetails/${encodeURIComponent(game.name)}`} className="game-link">
                                    <img src={game.background_image} alt={game.name} className="game-artwork" />
                                    <span className="game-name">{game.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results were found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
