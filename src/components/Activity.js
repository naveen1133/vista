import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Activity.css';
import amazonLogo from '../assets/amazon-logo.png'; // Ensure the path is correct
import tjxLogo from '../assets/tjx-logo.png'; // Ensure the path is correct

function Activity() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedClient } = location.state || { selectedClient: 'Amazon' }; // Default to Amazon if not set

  const logo = selectedClient === 'Amazon' ? amazonLogo : tjxLogo;
  const accountEnding = selectedClient === 'Amazon' ? '6586' : '1234';

  // Handle back button click
  const handleBackClick = () => {
    navigate('/accounts');
  };

  return (
    <div className="activity-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>Back</button>
      
      <div className="activity-header">
        <div className="logo-container">
          <img src={logo} alt={`${selectedClient} Logo`} className="activity-logo" />
        </div>
        <div className="account-ending-container">
          <p className="account-ending">Account ending in {accountEnding}</p>
        </div>
      </div>
      
      <div className="activity-content">
        <p className="posted">Posted</p>
        <div className="details-container">
          <div className="attributes-row">
            <div className="attribute-label">Date</div>
            <div className="attribute-label">Description</div>
            <div className="attribute-label">Amount</div>
          </div>
          <div className="detail-item">
            <p className="detail-date">2024-07-15</p>
            <p className="detail-description">Payment Received</p>
            <p className="detail-amount">
              <span className="tick-mark">✓</span> $100.00
            </p>
          </div>
          {/* Add more detail items as needed */}
        </div>
      </div>
    </div>
  );
}

export default Activity;
