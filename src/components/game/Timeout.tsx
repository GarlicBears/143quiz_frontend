import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Image,
  Box,
} from '@chakra-ui/react';
import timeoutImage from '../../asset/images/timeout.png';

interface TimeoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const Timeout: React.FC<TimeoutProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
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
              <Image src={timeoutImage} alt="timeout" />
            </Box>
            <Text fontSize="lg" as="b" marginY="16px">
              타임아웃
            </Text>
            <Text>제한 시간이 다 되었어요.</Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Timeout;
