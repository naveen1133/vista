import React from 'react';
import { useLocation } from 'react-router-dom';
import './Activity.css';
import amazonLogo from '../assets/amazon-logo.png'; // Ensure the path is correct
import tjxLogo from '../assets/tjx-logo.png'; // Ensure the path is correct

function Activity() {
  const location = useLocation();
  const { selectedClient } = location.state || { selectedClient: 'Amazon' }; // Default to Amazon if not set

  const logo = selectedClient === 'Amazon' ? amazonLogo : tjxLogo;
  const accountEnding = selectedClient === 'Amazon' ? '6586' : '1234';

  return (
    <div className="activity-container">
      <div className="activity-header">
        <div className="logo-container">
          <img src={logo} alt={`${selectedClient} Logo`} className="activity-logo" />
        </div>
        <div className="account-ending-container">
          <p className="account-ending">Account ending in {accountEnding}</p>
        </div>
      </div>
      {/* Add more content for the Activity page here */}
    </div>
  );
}

export default Activity;
