import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Layout from './Components/Common/Layout';
import Topic from './Pages/Topic';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/topic" element={<Topic />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
