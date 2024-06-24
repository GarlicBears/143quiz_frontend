import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../common/CustomModal';
import { Flex, Text, Box, Image } from '@chakra-ui/react';
import stopImage from '../../asset/images/colorX.png';

interface GameStopProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameStop: React.FC<GameStopProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/topic');
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      type="confirm"
      isCentered
      size="sm"
      onConfirm={handleConfirm}
    >
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Box
          boxSize="80px"
          bg="orange.100"
          borderRadius="full"
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="16px"
        >
          <Image src={stopImage} alt="stop" />
        </Box>
        <Text fontSize="lg" as="b">
          게임을 종료하시겠습니까?
        </Text>
        <Text>게임을 종료하면 현재 게임 기록은 사라집니다.</Text>
      </Flex>
    </CustomModal>
  );
};

export default GameStop;
