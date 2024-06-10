import React, { useState, useCallback } from 'react';
import CustomButton from './CustomButton';
import { Button, Flex, Text } from '@chakra-ui/react';
import Modal from './Modal';
import { ModalButtonProps } from '../../Types/common';

const ModalButton: React.FC<ModalButtonProps> = ({
  type = 'default',
  buttonText = 'Open Modal',
  variant,
  img,
  imgAlt,
  contentText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'default' | 'info' | 'confirm'>(
    type,
  );

  const openModal = useCallback(() => {
    setModalType(type);
    setIsOpen(true);
  }, [type]);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <CustomButton onClick={openModal} text={buttonText} variant={variant} />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        closeOnOverlayClick
        isCentered
        size="md"
        type={modalType}
      >
        <Flex
          height="100%"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="column"
        >
          {img && <img src={img} alt={imgAlt} />}
          {contentText && <Text>{contentText}</Text>}
        </Flex>
      </Modal>
    </>
  );
};

export default React.memo(ModalButton);
