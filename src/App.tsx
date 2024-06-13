import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Layout from './Components/Common/Layout';
import Topic from './Pages/Topic';
import Game from './Pages/Game';
import GameLayout from './Components/Game/GameLayout';
import { RecoilRoot } from 'recoil';
import GameComplete from './Pages/GameComplete';
import UserInfo from './Pages/User/UserInfo';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/topic" element={<Topic />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/signup" element={<UserSignup />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/userInfo" element={<UserInfo />} />
          </Route>
          <Route path="/game" element={<GameLayout />}>
            <Route index element={<Game />} />
          </Route>
          <Route path="/game/complete" element={<GameComplete />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
