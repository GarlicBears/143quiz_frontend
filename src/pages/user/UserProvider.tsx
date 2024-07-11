import React, { useEffect, ReactNode, createContext, useContext } from 'react';
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
  Gangwon: '강원',
  Chungcheong: '충청',
  Jeolla: '전라',
  Gyeongsang: '경상',
  Jeju: '제주',
  Overseas: '해외',
};

const UserContext = createContext<{
  fetchUserInfo: () => Promise<void>;
  clearUserInfo: () => void;
}>({
  fetchUserInfo: async () => {
    throw new Error('fetchUserInfo not implemented');
  },
  clearUserInfo: () => {
    throw new Error('clearUserInfo not implemented');
  },
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const setUserInfo = useSetRecoilState(userInfoState);

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get<UserResponse>('/user/');
      if (response.status === 200) {
        const data = response.data;
        setUserInfo({
          nickname: data.nickname,
          gender: genderMap[data.gender] || data.gender,
          location: locationMap[data.location] || data.location,
          imageUrl: data.imageUrl || '',
          birthYear: data.birthYear,
          badges: data.badges || [],
        });
      } else {
        console.error('Unexpected API response format', response.data);
      }
    } catch (error) {
      console.error('Failed to load user information', error);
    }
  };

  const clearUserInfo = () => {
    setUserInfo({
      nickname: '',
      gender: '',
      location: '',
      imageUrl: '',
      birthYear: 0,
      badges: [],
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ fetchUserInfo, clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
