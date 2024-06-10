import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Header />
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
      {/*Footer*/}
      <Footer />
    </Box>
  );
};

export default Layout;
