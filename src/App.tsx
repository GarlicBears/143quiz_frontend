import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Layout from './Components/Common/Layout';
import UserSignup from './Pages/User/UserSignup';
import MainPage from './Pages/MainPage';
import UserLogin from './Pages/User/UserLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="landing" index element={<LandingPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
