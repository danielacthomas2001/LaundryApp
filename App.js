import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Home2 from './Home2'
import Login from './Login';
import './App.css';
import './Login.css';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home2 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;