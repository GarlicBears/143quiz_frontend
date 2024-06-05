import React from 'react';
import { Box, Button, ButtonGroup, Container, Flex } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 뒤로 이동
  };
  return (
    <Box>
      <Flex
        as="header"
        width="100%"
        bg="var(--primary-color)"
        color="var(--text-color)"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        top="0"
      >
        <Flex
          width={{ base: '100%', md: '720px' }}
          padding="4"
          bg="transparent"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            width="120px"
            bg="transparent"
            color="var(--text--color)"
            _hover={{ bg: 'transparent' }}
            onClick={handleBackClick}
          >
            <i className="fa-solid fa-arrow-left fa-xl"></i>
            <Box marginLeft={4}>이전으로</Box>
          </Button>
          <i className="fa-solid fa-house fa-xl"></i>
          <Flex width="120px" justifyContent="flex-end">
            <Flex
              width="80px"
              justifyContent="space-around"
              alignItems="center"
            >
              <i className="fa-solid fa-medal fa-xl"></i>
              <i className="fa-solid fa-gear fa-xl"></i>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Container
        maxW="container.md"
        mt={4}
        width={{ base: '80%', md: '720px' }}
        height={{ base: 'calc(100vh - 150px)', md: 'calc(100vh - 250px)' }}
        bg="var(--background-color)"
        overflow="scroll"
      >
        <Outlet />
      </Container>
      <Box
        width="100%"
        height="50px"
        textAlign="center"
        bg="var(--background-color)"
        mt={4}
        position="fixed"
        bottom="50px"
      >
        Add
      </Box>
      <Box
        as="footer"
        width="100%"
        height="50px"
        padding="4"
        bg="var(--secondary-color)"
        color="white"
        textAlign="center"
        position="fixed"
        bottom="0"
      >
        &copy; 2024 Garlic Bears
      </Box>
    </Box>
  );
};

export default Layout;
