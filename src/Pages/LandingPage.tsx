import React from 'react';
import { Box, Button, ButtonGroup, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import gamelanding from '../Asset/images/gamelanding.png';
//First Page
const LandingPage = () => {
  const navigate = useNavigate();

  function handleClickLogin() {
    navigate('/login');
  }

  function hadleClickSignup() {
    navigate('/signup');
  }

  return (
    <Container
      // flex="1"
      maxW="container.xxl"
      mt={4}
      width={{ base: '100%', md: '720px' }}
      overflowY="auto"
      paddingBottom="200px"
      border="0px solid black"
    >
      <Box
        minH="90vh"
        py={10}
        px={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        backgroundImage={`url(${gamelanding})`}
        backgroundSize="90%"
        backgroundPosition="top center"
        backgroundRepeat="no-repeat"
        w="100%"
      >
        <Box flexDirection="column" mt="80%" w="70%" gap={10}>
          <Button
            w="100%"
            backgroundColor="orange.400"
            onClick={handleClickLogin}
          >
            로그인하기
          </Button>
          <Button
            mt={2}
            justifyContent="center"
            w="100%"
            backgroundColor="orange.400"
            onClick={hadleClickSignup}
          >
            회원가입하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
