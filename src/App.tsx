import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import LandingPage from './Pages/LandingPage';
import React from 'react';
import UserSignup from './Pages/User/UserSignup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<UserSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
