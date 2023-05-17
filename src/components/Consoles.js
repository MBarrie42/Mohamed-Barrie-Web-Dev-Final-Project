import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/Consoles.css'; // Import the CSS file

const Consoles = () => {
    const [consoles, setConsoles] = useState([]);

    useEffect(() => {
        const fetchConsoles = async () => {
            try {
                const response = await axios.get('https://api.rawg.io/api/platforms?key=cbde2235853a407382af5b7788c37b88');
                const data = response.data.results;
                setConsoles(data);
            } catch (error) {
                console.error('Error fetching consoles:', error);
            }
        };

        fetchConsoles();
    }, []);

    return (
        <div className="consoles-container">
            <Navigation />
            <h2 className="section-title">Popular Consoles</h2>
            <div className="console-grid">
                {consoles.map((console) => (
                    <div key={console.id} className="console-item">
                        <Link to={`/consoles/${console.id}`} className="console-link">
                            {console.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Consoles;
