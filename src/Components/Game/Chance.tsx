import React, { useState, useEffect } from 'react';
import CustomModal from '../Common/CustomModal';
import { Text, Button, Flex, Image, VStack, Box } from '@chakra-ui/react';
import CustomButton from '../Common/CustomButton';
import buttonSound from '../../Asset/audios/button.mp3';
import hintImage from '../../Asset/images/hint.png';

interface ChanceProps {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>; // 타이머 일시정지 상태 변경 함수
}

const Chance: React.FC<ChanceProps> = ({ setIsPaused }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(2);
  const [showButtons, setShowButtons] = useState(true);

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
  }, [isOpen, showButtons, setIsPaused]);

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
            찬스 내용
          </Text>
          <Text>{seconds} 초 후에 창이 닫힙니다.</Text>
        </VStack>,
      );
    } else {
      setModalContent(modalText);
    }
  }, [seconds, showButtons, modalText]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(true); // 모달이 열릴 때 타이머 일시정지
    setShowButtons(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false); // 모달이 닫힐 때 타이머 재개
    setShowButtons(true);
  };

  // 찬스 내용 보여주기
  const handleConfirm = () => {
    setSeconds(2);
    setShowButtons(false);
  };

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
