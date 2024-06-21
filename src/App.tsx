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
import UserInfo from './Pages/User/UserInfo';
import MainPage from './Pages/MainPage';
import UserSignup from './Pages/User/UserSignup';
import UserLogin from './Pages/User/UserLogin';
import UserInfoUpdate from './Pages/User/UserInfoUpdate';
import UserAccountDelete from './Pages/User/UserAccountDelete';
import UserBadge from './Pages/User/UserBadge';

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
            <Route path="/userInfo/badge" element={<UserBadge />} />
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
