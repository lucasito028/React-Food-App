import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="text-white p-4 flex flex-row justify-end">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-purple-500">Home</Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-purple-500">Favoritos</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
