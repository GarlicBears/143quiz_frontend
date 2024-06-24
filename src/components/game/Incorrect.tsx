import React, { useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Image,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { answerSubmitCountState } from '../../recoil/atom';
import incorrectSound from '../../asset/audios/error.mp3';
import stopImage from '../../asset/images/colorX.png';

interface IncorrectProps {
  isOpen: boolean;
  onClose: () => void;
  onNextQuestion: () => void; // 다음 문제로 넘어가는 함수
}

const Incorrect: React.FC<IncorrectProps> = ({
  isOpen,
  onClose,
  onNextQuestion,
}) => {
  const [answerSubmitCount, setAnswerSubmitCount] = useRecoilState(
    answerSubmitCountState,
  );
  const remainingChances = 3 - answerSubmitCount;

  useEffect(() => {
    if (isOpen && remainingChances <= 0) {
      const timer = setTimeout(() => {
        onNextQuestion(); // 기회가 0번 남았을 때 다음 문제로 이동
        onClose();
      }, 2000); // 2초 후에 모달을 닫고 다음 문제로 이동

      return () => clearTimeout(timer); // 타이머를 클린업
    }
  }, [isOpen, remainingChances, onNextQuestion, onClose]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(incorrectSound);
      audioRef.current.play();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
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
              <Image src={stopImage} alt="stop" />
            </Box>
            <Text>오답이에요! {remainingChances}번의 기회가 남았어요.</Text>
            <Text>{remainingChances <= 0 && ' 다음 문제로 이동합니다.'}</Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Incorrect;
