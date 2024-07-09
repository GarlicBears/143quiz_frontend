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
  Button,
  Switch,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import UserBadge from './UserBadge';
import UserAgreement from './UserAgreement';
import UserLogout from './UserLogout';
import axiosInstance from '../../api/axiosInstance';
import { fontSizeState } from '../../recoil/atoms';

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
  gender: keyof typeof genderMap;
  location: keyof typeof locationMap;
  imageUrl: string;
  birthYear: number;
  badges: { title: string; imageUrl: string }[];
}

interface UserInfo {
  nickname: string;
  gender: string;
  location: string;
  imageUrl: string;
  birthYear: number;
  badges: { title: string; imageUrl: string }[];
}

function UserInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    gender: '',
    location: '',
    imageUrl: '',
    birthYear: 0,
    badges: [],
  });

  const [fontSize, setFontSize] = useRecoilState(fontSizeState);

  useEffect(() => {
    axiosInstance
      .get<UserResponse>('/user/')
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setUserInfo({
            nickname: data.nickname,
            gender: genderMap[data.gender] || data.gender,
            location: locationMap[data.location] || data.location,
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
  }, []);

  function handleChangeUserInfo() {
    navigate('/userInfo/update', { state: userInfo });
  }

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Center>
      <Card
        w="100%"
        maxW="3xl"
        bg={bgColor}
        p={6}
        borderRadius="lg"
        shadow="md"
      >
        <Box textAlign="center">
          <Heading size="xl" color={textColor}>
            회원 정보
          </Heading>
          <CardBody
            onClick={handleChangeUserInfo}
            cursor="pointer"
            _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
          >
            {userInfo.imageUrl ? (
              <Image
                src={userInfo.imageUrl}
                borderRadius="full"
                boxSize="150px"
                alt="Profile Image"
                m="auto"
                mb={3}
              />
            ) : (
              <Text>No image</Text>
            )}
            <Box textAlign="center" fontSize="xl" mt={3} color={textColor}>
              <Text>성별: {userInfo.gender}</Text>
              <Text>거주지: {userInfo.location}</Text>
              <Text>별명: {userInfo.nickname}</Text>
            </Box>
            <Text align="right" color="gray.500" fontSize="lg">
              정보 수정
            </Text>
          </CardBody>
          <Divider mb={3} />
          <Box>
            <UserBadge userInfo={userInfo} />
          </Box>
          <Divider mt={3} mb={3} />
          <Text fontSize="xl" mt={3} color={textColor}>
            게임 설정
          </Text>
          {/*<Stack*/}
          {/*  direction="row"*/}
          {/*  spacing={4}*/}
          {/*  align="center"*/}
          {/*  justify="center"*/}
          {/*  mb={4}*/}
          {/*>*/}
          {/*  <Text>효과음 설정</Text>*/}
          {/*  <Switch />*/}
          {/*</Stack>*/}
          {/*<Stack*/}
          {/*  direction="row"*/}
          {/*  spacing={4}*/}
          {/*  align="center"*/}
          {/*  justify="center"*/}
          {/*  mb={4}*/}
          {/*>*/}
          {/*  <Text>알림 설정</Text>*/}
          {/*  <Switch />*/}
          {/*</Stack>*/}
          {/*<Stack*/}
          {/*  direction="row"*/}
          {/*  spacing={4}*/}
          {/*  align="center"*/}
          {/*  justify="center"*/}
          {/*  mb={4}*/}
          {/*>*/}
          {/*  <Text>글씨 크기 설정</Text>*/}
          {/*  <Button size="sm" onClick={() => setFontSize('small')}>*/}
          {/*    작게*/}
          {/*  </Button>*/}
          {/*  <Button size="sm" onClick={() => setFontSize('medium')}>*/}
          {/*    보통*/}
          {/*  </Button>*/}
          {/*  <Button size="sm" onClick={() => setFontSize('large')}>*/}
          {/*    크게*/}
          {/*  </Button>*/}
          {/*</Stack>*/}
          <Button w="100%" fontSize="lg" onClick={toggleColorMode} mt={3}>
            색상 모드 변경
          </Button>
          <Divider mt={3} mb={3} />
          <Stack
            direction="row"
            align="center"
            justify="center"
            spacing={4}
            mt={6}
            mb={3}
          >
            <UserAgreement />
          </Stack>
          <Center mt={5}>
            <UserLogout />
          </Center>
        </Box>
      </Card>
    </Center>
  );
}

export default UserInfo;
