import React, { useState, useEffect, useCallback } from 'react';
import CustomModal from '../common/CustomModal';
import { Text, Button, Flex, Image, VStack, Box } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';
import buttonSound from '../../asset/audios/button.mp3';
import hintImage from '../../asset/images/hint.png';

interface ChanceProps {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>; // 타이머 일시정지 상태 변경 함수
  updateHintUsageCount: (questionId: number) => void; // 힌트 사용 횟수 업데이트 함수
  questionId: number; // 현재 질문의 ID
  answerText: string; // 현재 질문의 답안
}

const Chance: React.FC<ChanceProps> = ({
  setIsPaused,
  updateHintUsageCount,
  questionId,
  answerText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(2);
  const [showButtons, setShowButtons] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(questionId);

  const modalText = (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      marginTop="16px"
    >
      <Box
        boxSize="80px"
        bg="orange.100"
        borderRadius="full"
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="16px"
      >
        <Image src={hintImage} alt="hint" />
      </Box>
      <Text textAlign="center" width="100%" fontSize="lg">
        찬스를 사용하시겠습니까?
      </Text>
    </Flex>
  );

  const [modalContent, setModalContent] = useState(modalText);

  // 타이머 설정 함수
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isOpen && !showButtons) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          } else {
            if (interval) {
              clearInterval(interval);
            }
            handleClose(); // 2초 후에 모달 닫기 및 타이머 재개
            return 2;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOpen, showButtons]);

  // 모달 안의 내용 설정 함수
  useEffect(() => {
    if (!showButtons) {
      setModalContent(
        <VStack>
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
            <Image src={hintImage} alt="hint" />
          </Box>
          <Text fontSize="lg" as="b">
            {displayText}
          </Text>
          <Text>{seconds} 초 후에 창이 닫힙니다.</Text>
        </VStack>,
      );
    } else {
      setModalContent(modalText);
    }
  }, [seconds, showButtons, displayText]);

  // Question ID가 변경될 때 초기화
  useEffect(() => {
    if (currentQuestionId !== questionId) {
      setDisplayText('');
      setUpdateCount(0);
      setCurrentQuestionId(questionId);
    }
  }, [questionId, currentQuestionId]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsPaused(true);
    setShowButtons(true);
  }, [setIsPaused]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsPaused(false);
    setShowButtons(true);
  }, [setIsPaused]);

  // 찬스 내용 보여주기
  const handleConfirm = useCallback(() => {
    setSeconds(2);
    setShowButtons(false);
    if (updateCount < answerText.length) {
      updateHintUsageCount(questionId); // 힌트 사용 횟수 업데이트
      setDisplayText(answerText.slice(0, updateCount + 1));
      setUpdateCount((prevCount) => prevCount + 1);
    }
  }, [answerText, updateCount, updateHintUsageCount, questionId]);

  return (
    <>
      <CustomButton
        text="찬스"
        variant="outline"
        soundSrc={buttonSound}
        baseWidth={148}
        width={200}
        onClick={handleOpen}
      />
      <CustomModal
        type="default"
        isOpen={isOpen}
        onClose={handleClose}
        footer={
          showButtons ? (
            <>
              <Button
                colorScheme="customOrange"
                variant="outline"
                onClick={handleClose}
              >
                아니오
              </Button>
              <Button colorScheme="customOrange" onClick={handleConfirm} ml={3}>
                예
              </Button>
            </>
          ) : null
        }
      >
        {modalContent}
      </CustomModal>
    </>
  );
};

export default Chance;
