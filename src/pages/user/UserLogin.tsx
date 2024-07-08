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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Cookies from 'js-cookie';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

//로그인 화면
function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    axiosInstance
      .post('/user/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        // 'authorization' 헤더에서 토큰 값을 추출
        const token = response.headers['authorization'];
        if (token) {
          // console.log('Authorization 헤더:', token); 필요없음
          console.log('전체 헤더:', response.headers);
          // Bearer 부분을 제거하고 토큰만 추출, % 기호 제거
          const accessToken = token;
          console.log('추출된 토큰:', accessToken);
          // 토큰을 쿠키에 저장
          Cookies.set('accessToken', accessToken, {
            expires: 1,
            secure: true,
            sameSite: 'Strict',
          });
          // 페이지 이동
          navigate('/main');
        } else {
          // 토큰이 없는 경우의 에러 처리
          toast({
            title: '로그인 실패',
            description: '인증 토큰을 받지 못했습니다.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        // 네트워크 오류 또는 다른 이유로 인한 실패 처리
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

  function handleTogglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  const isFormValid = email !== '' && password !== '';

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
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleTogglePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
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
            <Button
              w="100%"
              onClick={handleLogin}
              isDisabled={!isFormValid}
              colorScheme={isFormValid ? 'orange' : 'gray'}
            >
              로그인하기
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </Center>
  );
}

export default UserLogin;
