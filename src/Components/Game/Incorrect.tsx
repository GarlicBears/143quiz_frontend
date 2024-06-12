// Incorrect.tsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { answerSubmitCountState } from '../../Recoil/atom';

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

  const handleClose = () => {
    if (remainingChances <= 0) {
      onNextQuestion(); // 기회가 0번 남았을 때 다음 문제로 이동
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Incorrect</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          오답이에요! {remainingChances}번의 기회가 남았어요.
          {remainingChances <= 0 && ' 다음 문제로 이동합니다.'}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Incorrect;
