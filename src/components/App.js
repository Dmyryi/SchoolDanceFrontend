import React,{useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import './App.css';
import DancesPage from '../pages/DancesPage/DancesPage';
import { TrainersPage } from '../pages/TrainersPage/TrainersPage';
import { ShedulePage } from '../pages/ShedulesPage/ShedulesPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

    useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

   return isRefreshing ? (
    <b>Loading user data...</b>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dances" element={<DancesPage />} />
      <Route path="/trainers/:specDance" element={<TrainersPage />} />
      <Route path="/shedules/:trainerId" element={<ShedulePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
