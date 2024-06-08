import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Layout from './Components/Common/Layout';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          {/*<Route path="main" element={<MainPage />} />*/}
          {/*<Route path="main" element={<MainPage />} />*/}
          {/*<Route index element={<LandingPage />} />*/}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
