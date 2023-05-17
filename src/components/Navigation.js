import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
    const handleLogoClick = () => {
        return <Navigate to="/" />;
    };

    return (
        <nav className="navigation">
            <div className="container">
                <Link to="/" className="logo" onClick={handleLogoClick}>
                    Video Game Central
                </Link>
                <div className="links">
                    <Link to="/consoles" className="link">
                        Consoles
                    </Link>
                    <Link to="/genre" className="link">
                        Genres
                    </Link>
                    <Link to="/favorites" className="link">
                        My Favorites
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
