import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Center,
  Grid,
  GridItem,
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
  male: '남성',
  female: '여성',
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
}

interface UserInfo {
  nickname: string;
  gender: string;
  location: string;
  imageUrl: string;
}

function UserInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    gender: '',
    location: '',
    imageUrl: '',
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
        <Card w="100%">
          <Box>
            <Heading textAlign="center">○ 회원 정보</Heading>
            <Grid
              onClick={handleChangeUserInfo}
              templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
              gridTemplateRows={'0px 2fr 50px'}
              gridTemplateColumns={'150px 1fr'}
              h="200px"
              gap="1"
              color="blackAlpha.700"
              fontWeight="bold"
              _hover={{ borderWidth: '1px' }}
            >
              <GridItem
                display="flex"
                border="1px solid gray"
                justifyContent="center"
                alignItems="center"
                borderRadius="full"
                pl="2"
                area={'nav'}
              >
                <Box border="1px solid gray" borderRadius="full">
                  {userInfo.imageUrl ? (
                    <Image
                      src={userInfo.imageUrl}
                      borderRadius="full"
                      boxSize="50px"
                      alt="Profile Image"
                    />
                  ) : (
                    'No image' //이미지가 없을 경우 no image로 표시
                  )}
                </Box>
              </GridItem>
              <GridItem pl="2" border="1px solid gray" area={'main'}>
                Nickname: {userInfo.nickname}
                {/*Nickname: {userInfo.nickname}*/}
              </GridItem>
              <GridItem pl="2" border="1px solid gray" area={'footer'}>
                Gender: {userInfo.gender}
                <br />
                Location: {userInfo.location}
              </GridItem>
            </Grid>
          </Box>
          <Box
            mt={5}
            alignItems="center"
            fontSize="xl"
            justifyContent="center"
            _hover={{ borderWidth: '2px' }}
            display="flex"
          >
            {/*내가 모은 뱃지*/}
            <UserBadge />
          </Box>
          <Text textAlign="center" mt={5} fontSize="xl">
            게임 설정
          </Text>
          <Box mt={2} justifyContent="center" border="0px solid red">
            효과음 설정
          </Box>
          <Box mt={2} justifyContent="center" border="0px solid red">
            알림 설정
          </Box>
          <Box mt={2} justifyContent="center" border="0px solid red">
            글씨 크기 설정
          </Box>
          <Text textAlign="center" mt={5} fontSize="xl">
            이용 정책
          </Text>
          <UserAgreement />
          <Text textAlign="center" mt={5} _hover={{ borderWidth: '1px' }}>
            {/*로그아웃 모달*/}
            <UserLogout />
          </Text>
        </Card>
      </Center>
    </>
  );
}

export default UserInfo;
