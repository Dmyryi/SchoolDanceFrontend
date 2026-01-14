import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import './App.css';
import DancesPage from '../pages/DancesPage/DancesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dances" element={<DancesPage />} />
    </Routes>
  );
}

export default App;
