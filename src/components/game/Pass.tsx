import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import { Flex, Text, Image, Box } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';
import buttonSound from '../../asset/audios/button.mp3';
import skipImage from '../../asset/images/skip.png';

interface PassProps {
  fetchNextQuestion: () => void;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>; // 타이머 일시정지 상태 변경 함수
  checkAnswer: (inputAnswer: string, isPass?: boolean) => Promise<void>; // 정답 확인 함수
}

const Pass: React.FC<PassProps> = ({
  fetchNextQuestion,
  setIsPaused,
  checkAnswer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(true); // 모달이 열릴 때 타이머 일시정지
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false); // 모달이 닫힐 때 타이머 재개
  };

  const handleConfirm = async () => {
    setIsOpen(false);
    setIsPaused(false); // 타이머 재개
    await checkAnswer('', true); // 오답 처리 및 패스 플래그 전달
    fetchNextQuestion(); // 다음 문제 가져오기
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
      <CustomModal
        type="confirm"
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      >
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
            <Image src={skipImage} alt="skip" marginBottom="16px" />
          </Box>
          <Text as="b">이 문제를 건너뛰시겠습니까?</Text>
          <Text>해당 문제는 오답처리 됩니다.</Text>
        </Flex>
      </CustomModal>
    </>
  );
};

export default Pass;
