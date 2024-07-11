import React from 'react';
import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Add from './Add';
import logoImg from '../../asset/images/favicon.svg';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 뒤로 이동
  };
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* UserHeader*/}
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
            _hover={{ bg: 'transparent' }}
            onClick={handleBackClick}
          >
            <i className="fa-solid fa-arrow-left fa-xl"></i>
            <Text marginLeft={4}>이전으로</Text>
          </Button>
          <Link to="/">
            <Box>
              <Image src={logoImg} alt="logo image" />
            </Box>
          </Link>
          <Box width="120px" />
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
      <Add />
      <Footer />
    </Box>
  );
};

export default UserLayout;
