import React, { useEffect, useRef } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import correctSound from '../../Asset/audios/correct1.mp3';

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>정답이에요!</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Correct;
