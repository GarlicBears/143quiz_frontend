import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { ModalProps } from '../../Types/common';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = 'default',
  children = 'Default Content',
  footer,
  closeOnOverlayClick = true,
  position = 'absolute',
  top = '30%',
  left = '30%',
  transform = 'translate(-30%, -30%)',
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent
        position={position}
        top={top}
        left={left}
        transform={transform}
      >
        {type !== 'default' && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {footer ||
            (type !== 'default' && (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            ))}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default React.memo(Modal);
