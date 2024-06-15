import React, { useEffect, useState } from 'react';
import { Box, Card, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import axios from 'axios';

function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    profileImage: '',
    nickname: '',
    gender: '',
  });
  useEffect(() => {
    axios
      .get('/api/user/')
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('사용자 정보를 불러오는데 실패했습니다.', error);
      });
  }, []);
  return (
    <>
      <Center>
        <Card w="100%" gap={2}>
          <Grid
            templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
            gridTemplateRows={'50px 1fr 50px'}
            gridTemplateColumns={'150px 1fr'}
            h="200px"
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
              pl="2"
              bg="pink.300"
              area={'nav'}
            >
              <Box border="1px solid black">전희연</Box>{' '}
            </GridItem>
            <GridItem pl="2" bg="green.300" area={'main'}>
              유저의 닉네임
            </GridItem>
            <GridItem pl="2" bg="blue.300" area={'footer'}>
              유저 성별 정보
            </GridItem>
          </Grid>
          {/*</Box>*/}
          <Box
            mt={5}
            fontSize="xl"
            justifyContent="center"
            border="1px solid red"
          >
            내가 모은 뱃지{' '}
          </Box>
          <Text mt={5} fontSize="xl">
            게임 설정
          </Text>
          <Box mt={2} justifyContent="center" border="1px solid red">
            효과음 설정
          </Box>
          <Box mt={2} justifyContent="center" border="1px solid red">
            알림 설정
          </Box>
          <Box mt={2} justifyContent="center" border="1px solid red">
            글씨 크기 설정
          </Box>
          <Text mt={5} fontSize="xl">
            이용 정책
          </Text>
          <Box w="100%" justifyContent="center" border="1px solid red">
            개인정보처리방침
          </Box>
          <Text border="1px solid black" mt={5} fontSize="xl">
            로그아웃
          </Text>
        </Card>
      </Center>
    </>
  );
}

export default UserInfo;
