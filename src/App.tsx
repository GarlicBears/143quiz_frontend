import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Layout from './Components/Common/Layout';
import Topic from './Pages/Topic';
import Game from './Pages/Game';
import GameLayout from './Components/Game/GameLayout';
import { RecoilRoot } from 'recoil';
import GameComplete from './Pages/GameComplete';
import Error from './Pages/Error';
import EarnBadge from './Pages/EarnBadge';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/topic" element={<Topic />} />
          </Route>
          <Route path="/game" element={<GameLayout />}>
            <Route index element={<Game />} />
          </Route>
          <Route path="/game/complete" element={<GameComplete />} />
          <Route path="*" element={<Error />} />
          <Route path="/game/earnbadge" element={<EarnBadge />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
