import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Add from './Add';

const Layout: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
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
      <Add />
      <Footer />
    </Box>
  );
};

export default Layout;
