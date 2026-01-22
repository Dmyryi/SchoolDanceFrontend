import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import './App.css';
import DancesPage from '../pages/DancesPage/DancesPage';
import { TrainersPage } from '../pages/TrainersPage/TrainersPage';
import { ShedulePage } from '../pages/ShedulesPage/ShedulesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dances" element={<DancesPage />} />
      <Route path="/trainers/:specDance" element={<TrainersPage />} />
      <Route path="/shedules/:trainerId" element={<ShedulePage />} />

    </Routes>
  );
}

export default App;
