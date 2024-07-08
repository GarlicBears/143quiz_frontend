import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserBadge from './UserBadge';
import UserAgreement from './UserAgreement';
import UserLogout from './UserLogout';
import axiosInstance from '../../api/axiosInstance';

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

// API 응답 타입 정의
interface UserResponse {
  nickname: string;
  gender: keyof typeof genderMap; // genderMap의 키를 타입으로 사용
  location: keyof typeof locationMap; // locationMap의 키를 타입으로 사용
  imageUrl: string;
  birthYear: number;
}

interface UserInfo {
  nickname: string;
  gender: string;
  location: string;
  imageUrl: string;
  birthYear: number;
}

function UserInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    gender: '',
    location: '',
    imageUrl: '',
    birthYear: 0,
  });

  useEffect(() => {
    axiosInstance
      .get<UserResponse>('/user/')
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        if (response.status === 200) {
          setUserInfo({
            nickname: data.nickname,
            gender: genderMap[data.gender] || data.gender,
            location: locationMap[data.location] || data.location,
            imageUrl: data.imageUrl || '',
            birthYear: data.birthYear,
          });
        } else {
          console.error('Unexpected API response format', data);
        }
      })
      .catch((error) => {
        console.error('Failed to load user information', error);
      });
  }, []);

  //회원 정보를 수정할 수 있는 화면으로 이동
  function handleChangeUserInfo() {
    navigate('/userInfo/update', { state: userInfo });
  }

  return (
    <>
      <Center>
        <Card w="100%" border="1px solid orange">
          <Box>
            <Heading textAlign="center"> 회원 정보 </Heading>
            <Card
              mt={3}
              _hover={{
                color: 'orange.500',
                transformOrigin: 'center',
                borderWidth: '1px',
              }}
              onClick={handleChangeUserInfo}
            >
              <CardBody textAlign="center">
                {userInfo.imageUrl ? (
                  <Image
                    src={userInfo.imageUrl}
                    borderRadius="full"
                    boxSize="150px"
                    alt="Profile Image"
                    m="auto"
                  />
                ) : (
                  'No image' // 이미지가 없을 경우 'No image'로 표시
                )}
                <Box textAlign="center" fontSize="lg" mt={3}>
                  <Text>별명: {userInfo.nickname}</Text>
                  {/*Nickname: {userInfo.nickname}*/}
                  <Text>성별: {userInfo.gender}</Text>
                  {/*Gender: {userInfo.gender}*/}
                  <Text>거주지: {userInfo.location}</Text>
                  {/*Location: {userInfo.location}*/}
                </Box>
              </CardBody>
            </Card>
          </Box>
          <Divider />
          <Box
            mt={5}
            alignItems="center"
            fontSize="xl"
            justifyContent="center"
            _hover={{ color: 'orange.500' }}
            display="flex"
          >
            {/*내가 모은 뱃지*/}
            <UserBadge userInfo={userInfo} />
          </Box>
          <Text textAlign="center" mt={5} fontSize="xl">
            <Divider />
            게임 설정
          </Text>
          <Box mt={2} justifyContent="center">
            효과음 설정
          </Box>
          <Box mt={2} justifyContent="center" border="0px solid red">
            알림 설정
          </Box>
          <Box mt={2} justifyContent="center" border="0px solid red">
            글씨 크기 설정
          </Box>
          <Text textAlign="center" mt={5} mb={3} fontSize="xl">
            <Divider />
            이용 정책
          </Text>
          <UserAgreement />
          <Text textAlign="center" mt={5} _hover={{ borderWidth: '1px' }}>
            {/*로그아웃 모달*/}
          </Text>
          <UserLogout />
        </Card>
      </Center>
    </>
  );
}

export default UserInfo;