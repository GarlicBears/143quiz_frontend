import React, { useState } from 'react';
import { Box, Flex, Container, Text, Button } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import Modal from '../Common/Modal';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1); // 뒤로 이동
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // TODO : 해당 게임의 topic명 넣기
  const topic = '과일';

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
      <Modal isOpen={isModalOpen} onClose={handleModalClose} type={'confirm'}>
        <Text>게임을 그만두시겠습니까?</Text>
        <Text>지금까지의 풀이 기록이 모두 삭제됩니다. </Text>
      </Modal>
    </Box>
  );
};

export default Layout;
