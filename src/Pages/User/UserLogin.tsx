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
import axios from 'axios';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    //     axios
  }

  function CheckEmailExists() {
    axios
      .post('/api/user/checkEmail', { email })
      .then((response) => {
        if (response.data.exists) {
          toast({
            title: '중복된 이메일',
            description: '이미 사용 중인 이메일 입니다.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: '사용 가능한 이메일',
            description: '사용 가능한 이메일 입니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: '오류발생',
          description:
            '이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }

  function handleClickSignup() {
    navigate('/signup');
  }

  return (
    <Center>
      <Box>
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
            <Button w="100%">로그인하기</Button>
            {/* Click the button to go to the topic selection screen :'로그인 버튼' 하면 주제 선택 화면으로 이동 */}
          </CardFooter>
        </Card>
      </Box>
    </Center>
  );
}

export default UserLogin;
