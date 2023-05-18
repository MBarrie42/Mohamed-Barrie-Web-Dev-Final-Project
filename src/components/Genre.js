import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/Genre.css';

const Genre = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        //Fetch list of genres from API
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.rawg.io/api/genres?key=cbde2235853a407382af5b7788c37b88`
                );
                const data = response.data.results;
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <div className="genre-container">
            <Navigation />
            <h2 className="section-title">Popular Genres</h2>
            <div className="genre-grid">
                {genres.map((genre) => (
                    <div key={genre.id} className="genre-item">
                        <Link to={`/genres/${genre.id}`} className="genre-link">
                            {genre.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Genre;
