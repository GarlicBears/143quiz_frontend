import React from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

function UserInfoUpdate() {
  return (
    <Center>
      <VStack
        border="1px solid black"
        w="100%"
        p={2}
        spacing={3}
        align="stretch"
      >
        <Box textAlign="center">
          <Image
            // src={userImage}
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
        <Text>이용 동의 및 개인정보 처리방침</Text>
        <Text>로그아웃</Text>
        <Text>회원탈퇴</Text>
      </VStack>
    </Center>
  );
}

export default UserInfoUpdate;
