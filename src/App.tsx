import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Layout from './components/common/Layout';
import Topic from './pages/game/Topic';
import Game from './pages/game/Game';
import GameLayout from './components/game/GameLayout';
import { RecoilRoot } from 'recoil';
import GameComplete from './pages/game/GameComplete';
import Error from './pages/Error';
import EarnBadge from './pages/game/EarnBadge';

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
