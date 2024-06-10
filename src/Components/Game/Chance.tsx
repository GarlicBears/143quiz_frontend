import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import { Button } from '@chakra-ui/react';
import buttonSound from '../../Asset/audios/button.mp3';
import CustomButton from '../Common/CustomButton';

interface ChanceProps {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>; // 타이머 일시정지 상태 변경 함수
}

const Chance: React.FC<ChanceProps> = ({ setIsPaused }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(2);
  const [showButtons, setShowButtons] = useState(true);
  const [modalContent, setModalContent] = useState(
    <p>찬스를 사용하시겠습니까?</p>,
  );

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
            setIsOpen(false);
            setShowButtons(true);
            setIsPaused(false); // 모달이 닫힐 때 타이머 재개
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
        <>
          <p>찬스 내용</p>
          <p>{seconds} 초 후에 창이 닫힙니다.</p>
        </>,
      );
    }
  }, [seconds, showButtons]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(true); // 모달이 열릴 때 타이머 일시정지
    setSeconds(2);
    setShowButtons(true);
    setModalContent(<p>찬스를 사용하시겠습니까?</p>);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false); // 모달이 닫힐 때 타이머 재개
    setShowButtons(true);
    setSeconds(2);
    setModalContent(<p>찬스를 사용하시겠습니까?</p>);
  };

  // 찬스 내용 보여주기
  const handleConfirm = () => {
    setSeconds(2);
    setShowButtons(false);

    setTimeout(() => {
      setModalContent(
        <>
          <p>찬스 내용</p>
          <p>{seconds} 초 후에 창이 닫힙니다.</p>
        </>,
      );
    }, 0);
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
      <Modal
        type="default"
        isOpen={isOpen}
        onClose={handleClose}
        footer={
          showButtons ? (
            <>
              <Button variant="ghost" onClick={handleClose}>
                취소
              </Button>
              <Button colorScheme="blue" onClick={handleConfirm} ml={3}>
                확인
              </Button>
            </>
          ) : null
        }
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default Chance;
