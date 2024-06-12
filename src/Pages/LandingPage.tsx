import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
      flex="1"
      maxW="container.md"
      mt={4}
      width={{ base: '100%', md: '720px' }}
      bg="var(--background-color)"
      overflowY="auto"
      paddingBottom="200px"
    >
      <Box
        border="1px solid red"
        minH="90vh"
        py={10}
        px={5}
        display="flex" // Flexbox layout 사용
        flexDirection="column" // 자식 요소를 세로로 배열
        alignItems="center" // 자식 요소를 가운데 정렬
        width="100%" // 전체 너비 사용
      >
        <Box w="80%" h="20px">
          {/*143*/}
          <SimpleGrid columns={3}>
            <Box
              bg="blue.300"
              p={4}
              borderRadius="md"
              w="80px"
              h="80px"
              ml="20px"
            >
              <Text fontSize="3xl" color="white" textAlign="center">
                1
              </Text>
            </Box>
            <Box
              bg="pink.300"
              transform="rotate(-20deg)"
              p={4}
              borderRadius="md"
              w="80px"
              h="80px"
            >
              <Text fontSize="3xl" color="white" textAlign="center">
                4
              </Text>
            </Box>
            <Box
              bg="green.400"
              transform="rotate(20deg)"
              p={4}
              borderRadius="md"
              w="80px"
              h="80px"
              ml="-10px"
            >
              <Text fontSize="3xl" color="white" textAlign="center">
                3
              </Text>
            </Box>
          </SimpleGrid>
          {/*Text '초성게임'*/}
          <SimpleGrid columns={4} mt={5} gap={3} mr={30}>
            <Box bg="#ff8d41" p={4} borderRadius="md">
              <Text fontSize="3xl" color="black" textAlign="center">
                초
              </Text>
            </Box>
            <Box bg="#ff8d41" p={4} borderRadius="md">
              <Text fontSize="3xl" color="black" textAlign="center">
                성
              </Text>
            </Box>
            <Box bg="#ff8d41" p={4} borderRadius="md">
              <Text fontSize="3xl" color="black" textAlign="center">
                게
              </Text>
            </Box>
            <Box bg="#ff8d41" p={4} borderRadius="md">
              <Text fontSize="3xl" color="black" textAlign="center">
                임
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
        <ButtonGroup
          flexDirection="column"
          alignItems="center"
          width="80%"
          display="flex"
        >
          <Button onClick={handleClickLogin}>로그인하기</Button>
          <Button onClick={hadleClickSignup}>회원가입하기</Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default LandingPage;
