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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[a-z\d@$!%*?&]{8,}$/;

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    setEmailError('');
    setPasswordError('');

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

    axiosInstance
      .post('/user/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.headers['authorization'];
        if (token) {
          const accessToken = token;
          Cookies.set('accessToken', accessToken, {
            expires: 1,
            secure: true,
            sameSite: 'Strict',
          });
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
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage('입력한 이메일과 비밀번호를 찾을 수 없습니다.');
        } else {
          toast({
            title: '로그인에 실패했습니다.',
            description: error.response?.data?.message || 'An error occurred.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      });
  }

  function handleClickSignup() {
    navigate('/signup');
  }

  function handleTogglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && isFormValid) {
      handleLogin();
    }
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
