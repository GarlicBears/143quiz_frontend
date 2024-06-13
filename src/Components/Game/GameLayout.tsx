import React, { useState } from 'react';
import { Box, Flex, Container, Text, Button } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import GameStop from './GameStop';

const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // TODO : 해당 게임의 topic명 넣기
  const topic = '동물';

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Header */}
      <Flex
        as="header"
        width={{ base: '100%', md: '720px' }}
        height="50px"
        bg="var(--bg-color)"
        color="var(--text-color)"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="0"
        zIndex="1000"
        boxShadow="md"
        paddingX="20px"
      >
        <Text>143 초성게임({topic})</Text>
        <Button onClick={handleModalOpen}>X</Button>
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
        bottom="0"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        Add
      </Box>
      {/* Footer */}

      {/* Modal */}
      <GameStop isOpen={isModalOpen} onClose={handleModalClose} />
    </Box>
  );
};

export default Layout;
