import React, { useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Box,
} from '@chakra-ui/react';
import correctSound from '../../Asset/audios/correct1.mp3';
import correctImage from '../../Asset/images/correct.png';

interface CorrectProps {
  isOpen: boolean;
  onClose: () => void;
}

const Correct: React.FC<CorrectProps> = ({ isOpen, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(correctSound);
      audioRef.current.play();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
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
              <Image src={correctImage} alt="correct" />
            </Box>
            정답이에요!
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Correct;
