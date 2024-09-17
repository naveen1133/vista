import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import synchronyLogo from '../assets/synchrony-logo.png'; // Ensure the path is correct

function Home() {
  const [selectedClient, setSelectedClient] = useState('Amazon');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login', { state: { selectedClient } });
  };

  return (
    <div className="home-container">
      <img src={synchronyLogo} alt="Synchrony Logo" className="home-logo" />
      <div className="home-content">
        <h2>Login Name</h2>
        <div className="client-info">
          <label htmlFor="client-dropdown">Client</label>
          <select 
            id="client-dropdown"
            value={selectedClient} 
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="Amazon">Amazon</option>
            <option value="TJX">TJX</option>
          </select>
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Home;
