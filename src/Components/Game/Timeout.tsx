import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';

interface TimeoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const Timeout: React.FC<TimeoutProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <h2>타임아웃</h2>
          <p>제한 시간이 다 되었어요.</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Timeout;
