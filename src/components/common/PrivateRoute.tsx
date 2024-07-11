import React from 'react';
import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean;
}

export default function PrivateRoute({ authentication }: PrivateRouteProps) {
  // 쿠키에서 accessToken 가져오기
  const accessToken = Cookies.get('accessToken');

  if (authentication) {
    // 토큰이 반드시 필요한 페이지
    return accessToken === undefined ? <Navigate to="/" /> : <Outlet />;
  }
  return <Outlet />;
}
