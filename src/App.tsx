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
import UserInfo from './pages/user/UserInfo';
import MainPage from './pages/MainPage';
import UserSignup from './pages/user/UserSignup';
import UserLogin from './pages/user/UserLogin';
import UserInfoUpdate from './pages/user/UserInfoUpdate';
import UserAccountDelete from './pages/user/UserAccountDelete';
import UserAllRanking from './pages/user/UserAllRanking';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/topic" element={<Topic />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/userAllRanking" element={<UserAllRanking />} />
            <Route path="/userInfo/update" element={<UserInfoUpdate />} />
            <Route
              path="/userInfo/update/delete"
              element={<UserAccountDelete />}
            />
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
