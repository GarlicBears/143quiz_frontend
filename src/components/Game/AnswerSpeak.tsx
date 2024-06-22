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
  keyframes,
} from '@chakra-ui/react';
import buttonSound from '../../asset/audios/button.mp3';
import CustomButton from '../Common/CustomButton';
import { AnswerProps } from '../../types/common';

const AnswerSpeak: React.FC<AnswerProps> = ({ setIsPaused, checkAnswer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecognizing(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      alert('음성 인식 중 오류가 발생했습니다.');
      setIsRecognizing(false);
    };

    recognition.onend = () => {
      setIsRecognizing(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecognition = () => {
    if (recognitionRef.current) {
      setText('...');
      recognitionRef.current.start();
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(true);
    startRecognition();
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false);
    stopRecognition();
  };

  const handleConfirm = () => {
    console.log('AnswerSpeak: handleConfirm 호출됨'); // 디버깅 로그
    console.log('AnswerSpeak: text =', text); // 디버깅 로그
    checkAnswer(text);
    setIsOpen(false);
    setIsPaused(false);
    stopRecognition();
  };

  const reSpeak = () => {
    setText('');
    startRecognition();
  };

  // 음성 인식 중의 애니메이션
  const pulse = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  `;

  return (
    <>
      <CustomButton
        text="말하기"
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
                <Box
                  boxSize="40px"
                  bg="orange"
                  borderRadius="full"
                  animation={isRecognizing ? `${pulse} 1.5s infinite` : 'none'}
                />
              </Box>
            </Center>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              정답을 말하세요.
            </Text>
            <Text fontSize="2xl" textAlign="center" mt={2} color="gray.600">
              {text || '...'}
            </Text>
          </ModalBody>
          <ModalFooter flexDirection="column">
            <Button
              variant="outline"
              colorScheme="orange"
              width="100%"
              mb={2}
              onClick={reSpeak}
              isDisabled={isRecognizing || !text}
            >
              다시 말하기
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

export default AnswerSpeak;
