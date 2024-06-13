import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';

function UserInfo() {
  return (
    <>
      <Center>
        <Card w="100%" gap={2}>
          {/*<Box border="1px solid black">*/}
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
            <GridItem pl="2" bg="pink.300" area={'nav'}>
              유저가 설정한 프로필 이미지
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
          {/*<CardHeader textAlign="center" border="2px solid blue"></CardHeader>*/}
          {/*<CardBody border="2px solid red"></CardBody>*/}
          {/*<CardFooter border="1px solid black" justifyContent="center">*/}
          {/*  {' '}*/}
          {/*  CardFooter*/}
          {/*</CardFooter>*/}
        </Card>
      </Center>
    </>
  );
}

export default UserInfo;
