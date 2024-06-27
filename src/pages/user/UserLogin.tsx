import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Cookies from 'js-cookie';

//로그인 화면
function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    axiosInstance
      .post('/user/login', {
        userEmail: email,
        userPassword: password,
      })
      .then((response) => {
        const { token } = response.data; // 토큰 추출
        Cookies.set('token', token); //토큰을 쿠키에 저장
        navigate('/topic'); //토픽 화면으로 이동
      })
      .catch((error) => {
        toast({
          title: '로그인에 실패했습니다.',
          description: error.response?.data?.message || 'An error occurred.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  function handleClickSignup() {
    navigate('/signup');
  }

  return (
    <Center>
      <Box border="0px solid" w="100%">
        <Card>
          <CardHeader>
            <Heading>○ 로그인</Heading>
          </CardHeader>
          <CardBody>
            <FormControl mb={5}>
              <FormLabel>가입한 이메일</FormLabel>
              <Input
                placeholder="가입한 이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password" //cover the password ***
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <br />
            <Link style={{ textDecoration: 'underline', color: '#e66119' }}>
              비밀번호를 잊으셨나요?
            </Link>
            <Flex alignItems="center">
              <Text>143 초성게임이 처음이신가요?</Text>
              <Link
                onClick={handleClickSignup}
                style={{ textDecoration: 'underline', color: '#cc5317' }}
              >
                회원가입
              </Link>
            </Flex>
          </CardBody>
          <CardFooter>
            <Button w="100%" onClick={handleLogin}>
              로그인하기
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </Center>
  );
}

export default UserLogin;
