import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { Text } from '@chakra-ui/react';
import CustomButton from '../Common/CustomButton';
import buttonSound from '../../Asset/audios/button.mp3';

interface PassProps {
  fetchNextQuestion: () => void;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>; // 타이머 일시정지 상태 변경 함수
}

const Pass: React.FC<PassProps> = ({ fetchNextQuestion, setIsPaused }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(true); // 모달이 열릴 때 타이머 일시정지
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false); // 모달이 닫힐 때 타이머 재개
  };

  const handleConfirm = () => {
    console.log('confirmed');
    setIsOpen(false);
    fetchNextQuestion(); // 다음 문제 가져오기
    setIsPaused(false); // 타이머 재개
  };

  return (
    <>
      <CustomButton
        text="패스"
        variant="outline"
        soundSrc={buttonSound}
        baseWidth={148}
        width={200}
        onClick={handleOpen}
      />
      <Modal
        type="confirm"
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      >
        <p>이 문제를 건너뛰시겠습니까?</p>
        <Text>해당 문제는 오답처리 됩니다.</Text>
      </Modal>
    </>
  );
};

export default Pass;
