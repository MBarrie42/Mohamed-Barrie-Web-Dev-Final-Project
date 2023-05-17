import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://api.rawg.io/api/games?search=${encodeURIComponent(
                    searchTerm
                )}&key=cbde2235853a407382af5b7788c37b88`
            );
            const results = response.data.results;
            setSearchResults(results);
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        } catch (error) {
            console.error('Error searching games:', error);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a game..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
