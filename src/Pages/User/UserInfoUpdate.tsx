import React from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import UserAgreement from './UserAgreement';
import UserAccountDelete from './UserAccountDelete';
import UserLogout from './UserLogout';

function UserInfoUpdate() {
  const generateYearOption = () => {
    const startYear = 1940;
    const endYear = 2022;
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i,
    );
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  return (
    <Center>
      <VStack
        border="0px solid black"
        w="100%"
        p={2}
        spacing={3}
        align="stretch"
      >
        <Box textAlign="center">
          <Text border="0px solid black" textAlign="center">
            회원정보 수정
          </Text>
          <Image
            // src={userImage}
            border="0px solid black"
            borderRadius="full"
            boxSize="150px"
            margin="auto"
          />
          <Input
            type="file"
            accept="image/*"
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            aria-label="Update profile image"
            size="lg"
          />
          <Button variant="ghost" textDecoration="underline" mt={4}>
            이미지 업로드
          </Button>
          <Text>내가 모은 뱃지로 프로필 설정하기</Text>
        </Box>
        <Divider />
        <Box>
          <FormControl>
            <FormLabel>출생연도 변경</FormLabel>
            <Select placeholder="출생연도 변경 시 선택해주세요 ">
              {generateYearOption()}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>성별 변경</FormLabel>
            <Select placeholder="성별 변경 시 선택해주세요">
              <option>남성</option>
              <option>여성</option>
              <option>기타</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>거주지 변경</FormLabel>
            <Select placeholder="거주지를 변경 시 선택해주세요">
              <option>서울</option>
              <option>경기</option>
              <option>강원</option>
              <option>전라</option>
              <option>충청</option>
              <option>경상</option>
              <option>제주</option>
              <option>해외</option>
            </Select>
          </FormControl>
          <Button mt="20px" w="100%">
            변경 사항 저장
          </Button>
        </Box>
        <Divider />
        {/*<Text>이용 동의 및 개인정보 처리방침</Text>*/}
        <UserAgreement />
        <Divider />
        <UserLogout />
        <Divider />
        {/*<Text>로그아웃</Text>*/}
        <UserAccountDelete />
        <Divider />
      </VStack>
    </Center>
  );
}

export default UserInfoUpdate;
