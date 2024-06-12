import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 뒤로 이동
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Flex
        as="header"
        width="100%"
        bg="var(--primary-color)"
        color="var(--text-color-white)"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        top="0"
        zIndex="1000"
        boxShadow="md"
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
            color="var(--text-color-white)"
            _hover={{ bg: 'transparent', textDecoration: 'underline' }}
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
      {/* Main Content */}
      <Container
        flex="1"
        maxW="container.md"
        mt={4}
        width={{ base: '100%', md: '720px' }}
        bg="var(--background-color)"
        overflowY="auto"
        paddingBottom="200px"
      >
        <Outlet />
      </Container>

      {/* Add Section */}
      <Box
        width="100%"
        height="50px"
        textAlign="center"
        bg="var(--bg-color-gray)"
        position="fixed"
        bottom="50px"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        Add
      </Box>
      {/* Footer */}
      <Box
        as="footer"
        width="100%"
        height="50px"
        padding="4"
        bg="var(--bg-color)"
        color="var(--text-color)"
        textAlign="center"
        position="fixed"
        bottom="0"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        &copy; 2024 Garlic Bears
      </Box>
    </Box>
  );
};

export default Layout;
