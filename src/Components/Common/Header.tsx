import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 뒤로 이동
  };
  return (
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
          <Box marginLeft={4}>이전으로</Box>
        </Button>
        <i className="fa-solid fa-house fa-xl"></i>
        <Flex width="120px" justifyContent="flex-end">
          <Flex width="80px" justifyContent="space-around" alignItems="center">
            <i className="fa-solid fa-medal fa-xl"></i>
            <i className="fa-solid fa-gear fa-xl"></i>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
