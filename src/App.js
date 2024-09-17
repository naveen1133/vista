import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // This component contains the dropdown and login button
import Login from './components/Login';
import Account from './components/Account';
import Activity from './components/Activity'; // Import the new Activity component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/accounts/activity" element={<Activity />} /> {/* Add route for Activity page */}
      </Routes>
    </Router>
  );
}

export default App;
