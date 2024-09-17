import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Account.css';
import amazonLogo from '../assets/amazon-logo.png'; // Ensure the path is correct
import amazonCardImage from '../assets/amazon-card.png'; // Ensure the path is correct
import tjxLogo from '../assets/tjx-logo.png'; // Ensure the path is correct
import tjxCardImage from '../assets/tjx-card.png'; // Ensure the path is correct
import synchronyLogo from '../assets/synchrony-logo.png'; // Ensure the path is correct

function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedClient } = location.state || { selectedClient: 'Amazon' };

  const handleLogout = () => {
    navigate('/');
  };

  const handleActivityClick = () => {
    navigate('/accounts/activity', { state: { selectedClient } }); // Pass selectedClient state
  };

  const logo = selectedClient === 'Amazon' ? amazonLogo : tjxLogo;
  const cardImage = selectedClient === 'Amazon' ? amazonCardImage : tjxCardImage;
  const accountDetails = selectedClient === 'Amazon'
    ? { card: 'Amazon Store Card', ending: '6586', balance: '$0.00', spend: '$5,200.00', dueDate: 'Oct 1' }
    : { card: 'TJX Store Card', ending: '1234', balance: '$100.00', spend: '$2,000.00', dueDate: 'Oct 10' };

  return (
    <div className="account-container">
      <img src={synchronyLogo} alt="Synchrony Logo" className="synchrony-logo" />
      <div className="account-content">
        <div className="account-header">
          <img src={logo} alt={`${selectedClient} Logo`} className="logo" />
          <div className="vertical-line"></div> {/* Vertical line */}
          <div className="account-details">
            <h3 className="store-card">{accountDetails.card}</h3>
            <p className="store-card">Account ending in {accountDetails.ending}</p>
          </div>
        </div>

        {/* Status Message Between the Logo/Details and Card Image */}
        <div className="status-message-container">
          <p className="status-message">No minimum payment due.</p>
        </div>

        <div className="card-and-info-container">
          <div className="card-image-container">
            <img src={cardImage} alt={`${selectedClient} Card`} className="card-image" />
          </div>

          <div className="account-info">
            <div className="account-stats">
              <div className="info-item">
                <p>{accountDetails.balance}</p>
                <p><span className="info-label">Current Balance</span></p>
              </div>
              <div className="info-item">
                <p>{accountDetails.spend}</p>
                <p><span className="info-label">Available to spend</span></p>
              </div>
              <div className="info-item">
                <p>{accountDetails.dueDate}</p>
                <p><span className="info-label">Payment Due Date</span></p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleActivityClick} className="activity-button">Activity</button>
      </div>
    </div>
  );
}

export default Account;
