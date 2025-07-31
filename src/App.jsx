// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Exercise Tracker</h1>
          <p>Track your exercises effectively.</p>
        </header>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<EditExercisePage />} />
            <Route path="/create" element={<CreateExercisePage />} />
          </Routes>
        </main>
        <footer>
          <p>© {new Date().getFullYear()} Saúl Galarza</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
