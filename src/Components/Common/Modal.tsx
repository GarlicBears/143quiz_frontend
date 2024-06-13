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
  onConfirm,
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
          {type === 'confirm' ? (
            <>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                아니오
              </Button>
              <Button colorScheme="green" onClick={onConfirm}>
                예
              </Button>
            </>
          ) : (
            footer ||
            (type !== 'default' && (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            ))
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default React.memo(Modal);
