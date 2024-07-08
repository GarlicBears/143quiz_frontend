import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  preventBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ preventBack }) => {
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
        {preventBack ? (
          <Box width="120px" bg="transparent" />
        ) : (
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
        )}
        <Link to="/topic">
          <i className="fa-solid fa-house fa-xl"></i>
        </Link>

        <Flex width="120px" justifyContent="flex-end">
          <Flex width="80px" justifyContent="space-around" alignItems="center">
            <Link to="/userAllRanking">
              <i className="fa-solid fa-medal fa-xl" />
            </Link>
            <Link to="/userinfo">
              <i className="fa-solid fa-gear fa-xl" />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
