import React, { useEffect, ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import axiosInstance from '../../api/axiosInstance';
import { userInfoState } from '../../recoil/atoms';
import { Badge } from '../../types/common';

interface UserProviderProps {
  children: ReactNode;
}

interface UserResponse {
  nickname: string;
  gender: keyof typeof genderMap;
  location: keyof typeof locationMap;
  imageUrl: string;
  birthYear: number;
  badges: Badge[];
}

const genderMap = {
  male: '남자',
  female: '여자',
  other: '기타',
};

const locationMap = {
  Seoul: '서울',
  Gyeonggi: '경기',
  Incheon: '인천',
  Chungcheong: '충청',
  Jeolla: '전라',
  Gyeongsang: '경상',
  Jeju: '제주',
  Overseas: '해외',
  Gangwon: '강원',
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    axiosInstance
      .get<UserResponse>('/user/')
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setUserInfo({
            nickname: data.nickname,
            gender:
              genderMap[data.gender as keyof typeof genderMap] || data.gender,
            location:
              locationMap[data.location as keyof typeof locationMap] ||
              data.location,
            imageUrl: data.imageUrl || '',
            birthYear: data.birthYear,
            badges: data.badges || [],
          });
        } else {
          console.error('Unexpected API response format', data);
        }
      })
      .catch((error) => {
        console.error('Failed to load user information', error);
      });
  }, [setUserInfo]);

  return <>{children}</>;
};

export default UserProvider;
