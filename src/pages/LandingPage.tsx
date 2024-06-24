import React from 'react';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import gamelanding from '../Asset/images/gamelanding.png';
//게임의 첫 화면
const LandingPage = () => {
  const navigate = useNavigate();

  function handleClickLogin() {
    navigate('/login');
  }

  function hadleClickSignup() {
    navigate('/signup');
  }

  return (
    <Container>
      <Box
        backgroundImage={`url(${gamelanding})`}
        height="720px"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Flex flexDirection="column" height="100%">
          <Box height="70%" />
          <Flex height="30%" flexDirection="column" gap={2} alignItems="center">
            <Button
              onClick={handleClickLogin}
              w="80%"
              colorScheme="customOrange"
            >
              로그인
            </Button>
            <Button
              onClick={hadleClickSignup}
              w="80%"
              colorScheme="customOrange"
            >
              회원가입
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default LandingPage;
