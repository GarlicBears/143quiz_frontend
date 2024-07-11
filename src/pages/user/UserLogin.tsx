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
  FormErrorMessage,
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

import { useUserContext } from './UserProvider';

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
const passwordRegex =
  /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])|(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])|(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%?&]))[A-Za-z\d@$!%?&]{8,}$/;
//비밀번호 : 패턴이 최소8자 이상 영문 대문자, 소문자, 특수문자 중 최소3가지가 포함되어야 함
const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const toast = useToast();
  const { fetchUserInfo } = useUserContext();

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError('올바르지 못한 이메일 형식입니다.');
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('올바르지 못한 비밀번호 형식입니다.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await axiosInstance.post('/user/login', {
        email: email,
        password: password,
      });

      const token = response.headers['authorization'];
      if (token) {
        Cookies.set('accessToken', token, {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
        });

        await fetchUserInfo();

        navigate('/main');
      } else {
        toast({
          title: '로그인 실패',
          description: '인증 토큰을 받지 못했습니다.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.');
      } else {
        setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.');
      }
    }
  };
  const handleClickSignup = () => {
    navigate('/signup');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isFormValid) {
      handleLogin();
    }
  };

  const isFormValid = email !== '' && password !== '';

  return (
    <Center>
      <Box border="0px solid" w="100%">
        <Card>
          <CardHeader>
            <Heading>○ 로그인</Heading>
          </CardHeader>
          <CardBody>
            <FormControl mb={5} isInvalid={!!emailError}>
              <FormLabel>가입한 이메일</FormLabel>
              <Input
                placeholder="가입한 이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
            </FormControl>
            <FormControl mb={5} isInvalid={!!passwordError}>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
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
              {passwordError && (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              )}
            </FormControl>
            <Flex alignItems="center">
              <Text>143 초성게임이 처음이신가요?</Text>
              <Link
                onClick={handleClickSignup}
                style={{ textDecoration: 'underline', color: '#cc5317' }}
              >
                회원가입
              </Link>
            </Flex>
            {errorMessage && (
              <Text color="red.500" mt={2}>
                {errorMessage}
              </Text>
            )}
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
};

export default UserLogin;
