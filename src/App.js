import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Consoles from './components/Consoles';
import Genre from './components/Genre';
import ConsoleDetails from './components/ConsoleDetails';
import GenreDetails from './components/GenreDetails';
import Favorites from './components/Favorites';
import SearchPage from './components/SearchPage';
import GameDetails from './components/GameDetails';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consoles" element={<Consoles />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/consoles/:id" element={<ConsoleDetails />} />
            <Route path="/genres/:id" element={<GenreDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search/*" element={<SearchPage />} />
            <Route path="/gamedetails/:gameName" element={<GameDetails />} />
        </Routes>
    );
};

export default App;
