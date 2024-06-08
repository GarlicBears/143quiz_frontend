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
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent>
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
