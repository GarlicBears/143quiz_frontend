import React, { useState } from 'react';
import { Box, Flex, Container, Text, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import GameStop from './GameStop';
import xImage from '../../asset/images/blackX.png';
import Add from '../common/Add';
import Footer from '../common/Footer';
import { titleState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // TODO : 해당 게임의 topic명 넣기
  const topic = useRecoilValue(titleState);

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
        width={{ base: '100vw', md: '720px' }}
        height="50px"
        bg="var(--bg-color)"
        color="var(--text-color)"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="0"
        zIndex="1000"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        paddingX="20px"
      >
        <Text>143 초성게임({topic})</Text>
        <Box onClick={handleModalOpen} width="32px" cursor="pointer">
          <Image src={xImage} alt="exit" />
        </Box>
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
      {/* Modal */}
      <GameStop isOpen={isModalOpen} onClose={handleModalClose} />
    </Box>
  );
};

export default Layout;
