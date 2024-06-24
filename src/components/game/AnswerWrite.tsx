import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Center,
  Input,
  Image,
} from '@chakra-ui/react';
import buttonSound from '../../asset/audios/button.mp3';
import CustomButton from '../common/CustomButton';
import { AnswerProps } from '../../types/common';
import writeImage from '../../asset/images/write.png';

const AnswerWrite: React.FC<AnswerProps> = ({ setIsPaused, checkAnswer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // 약간의 지연 시간을 추가하여 모달이 완전히 열릴 때까지 대기
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false);
    setText('');
  };

  const handleConfirm = () => {
    console.log('AnswerWrite: handleConfirm 호출됨'); // 디버깅 로그
    console.log('AnswerWrite: text =', text); // 디버깅 로그
    checkAnswer(text);
    setIsOpen(false);
    setIsPaused(false);
    setText('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text) {
      handleConfirm();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleRewrite = () => {
    setText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <CustomButton
        text="쓰기"
        variant="outline"
        soundSrc={buttonSound}
        baseWidth={148}
        width={200}
        onClick={handleOpen}
      />
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md" p={4}>
          <ModalCloseButton />
          <ModalBody>
            <Center mb={4}>
              <Box
                boxSize="80px"
                bg="orange.100"
                borderRadius="full"
                p={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image src={writeImage} alt="write" />
              </Box>
            </Center>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              정답을 입력하세요.
            </Text>
            <Input
              mt={2}
              placeholder="정답 입력"
              value={text}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              ref={inputRef}
            />
          </ModalBody>
          <ModalFooter flexDirection="column">
            <Button
              variant="outline"
              colorScheme="orange"
              width="100%"
              mb={2}
              onClick={handleRewrite}
              isDisabled={!text}
            >
              다시 쓰기
            </Button>
            <Button
              colorScheme="orange"
              width="100%"
              onClick={handleConfirm}
              isDisabled={!text}
            >
              정답 제출
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerWrite;
