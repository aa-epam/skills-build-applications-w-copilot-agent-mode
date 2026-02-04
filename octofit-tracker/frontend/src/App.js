import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container mt-4">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to the OctoFit Tracker frontend.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src="/octofitapp-small.svg" alt="OctoFit" className="logo me-2" />
            <span>OctoFit</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="app-content container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
