import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import amazonLogo from '../assets/amazon-logo.png';
import tjxLogo from '../assets/tjx-logo.png';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedClient } = location.state || { selectedClient: 'Amazon' };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (
      (selectedClient === 'Amazon' && username === 'amazon6586' && password === 'Test12test') ||
      (selectedClient === 'TJX' && username === 'tjx456' && password === 'Test12Test')
    ) {
      navigate('/accounts', { state: { selectedClient } });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        {selectedClient === 'Amazon' ? (
          <img src={amazonLogo} alt="Amazon Logo" className="logo" />
        ) : (
          <img src={tjxLogo} alt="TJX Logo" className="logo" />
        )}
      </div>
      <div className="login-content">
        <h2>Access Your Account</h2>
        <div>
          <label>User ID</label>
          <input
            type="text"
            placeholder="User ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button onClick={handleLogin}>Secure Login</button>
      </div>
    </div>
  );
}

export default Login;
