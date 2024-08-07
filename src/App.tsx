/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  ThemeConfig,
  ThemeOverride,
  useColorMode,
  ColorMode,
} from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Layout from './components/common/Layout';
import Topic from './pages/game/Topic';
import Game from './pages/game/Game';
import GameLayout from './components/game/GameLayout';
import { RecoilRoot, useRecoilValue } from 'recoil';
import GameComplete from './pages/game/GameComplete';
import Error from './pages/Error';
import EarnBadge from './pages/game/EarnBadge';
import UserInfo from './pages/user/UserInfo';
import UserProvider from './pages/user/UserProvider';
import MainPage from './pages/MainPage';
import UserSignup from './pages/user/UserSignup';
import UserLogin from './pages/user/UserLogin';
import UserInfoUpdate from './pages/user/UserInfoUpdate';
import UserAccountDelete from './pages/user/UserAccountDelete';
import UserAllRanking from './pages/user/UserAllRanking';
import customTheme from './styles/Theme/index';
import { fontSizeState } from './recoil/atoms';
import UserLayout from './components/common/UserLayout';
import PrivateRoute from './components/common/PrivateRoute';

interface ThemeProps {
  colorMode: ColorMode;
}

const AppContent: React.FC = () => {
  const fontSize = useRecoilValue(fontSizeState);
  const { colorMode } = useColorMode();

  const theme: ThemeOverride = extendTheme({
    styles: {
      global: (props: ThemeProps) => ({
        body: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
          color: props.colorMode === 'dark' ? 'white' : 'black',
          fontSize:
            fontSize === 'small'
              ? '14px'
              : fontSize === 'large'
                ? '18px'
                : '16px',
        },
        '*': {
          color: props.colorMode === 'dark' ? 'white' : 'black',
        },
      }),
    },
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    } as ThemeConfig,
  });

  // 배포 시 콘솔로그 막기
  if (process.env.NODE_ENV === 'production') {
    ['log', 'warn', 'error'].forEach((method) => {
      (console as any)[method] = () => {
        /* no-op */
      };
    });
  }

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript
        initialColorMode={theme.config?.initialColorMode ?? 'light'}
      />

      <Router basename={process.env.REACT_APP_WS_URL}>
        <Routes>
          <Route element={<PrivateRoute authentication={false} />}>
            <Route index element={<LandingPage />} />
            <Route element={<UserLayout />}>
              <Route path="/signup" element={<UserSignup />} />
              <Route path="/login" element={<UserLogin />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute authentication={true} />}>
            <Route path="/" element={<Layout />}>
              <Route path="/topic" element={<Topic />} />
              <Route path="/main" element={<MainPage />} />
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
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </RecoilRoot>
  );
};

export default App;
/* eslint-enable react/prop-types */
