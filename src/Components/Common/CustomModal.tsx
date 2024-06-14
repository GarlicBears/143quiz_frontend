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
import { CustomModalProps } from '../../Types/common';

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  type = 'default',
  children = 'Default Content',
  footer,
  closeOnOverlayClick = true,
  onConfirm,
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      isCentered
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        {type !== 'default' && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {type === 'confirm' ? (
            <>
              <Button
                colorScheme="customOrange"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                아니오
              </Button>
              <Button colorScheme="customOrange" onClick={onConfirm}>
                예
              </Button>
            </>
          ) : (
            footer ||
            (type !== 'default' && (
              <Button colorScheme="customOrange" mr={3} onClick={onClose}>
                Close
              </Button>
            ))
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default React.memo(CustomModal);
