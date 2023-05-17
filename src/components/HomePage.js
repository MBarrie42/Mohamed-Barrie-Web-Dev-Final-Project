import React from 'react';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import TrendingGames from './TrendingGames';
import NewGames from './NewGames';
import ComingSoon from './ComingSoon';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <Navigation />
            <div className="content-container">
                <div className="searchbar-section">
                    <SearchBar />
                </div>
                <div className="games-section">
                    <div className="game-section">
                        <h2 className="section-title">Trending Games</h2>
                        <TrendingGames />
                    </div>
                    <div className="game-section">
                        <h2 className="section-title">New Games</h2>
                        <NewGames />
                    </div>
                    <div className="game-section">
                        <h2 className="section-title">Coming Soon</h2>
                        <ComingSoon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
