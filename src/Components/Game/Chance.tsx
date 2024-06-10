import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import { Button } from '@chakra-ui/react';
import buttonSound from '../../Asset/audios/button.mp3';
import CustomButton from '../Common/CustomButton';
import { ChanceProps } from '../../Types/common';

const Chance: React.FC<ChanceProps> = ({ chance, setChance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(2);
  const [showButtons, setShowButtons] = useState(true);
  const [modalContent, setModalContent] = useState(
    <p>찬스를 사용하시겠습니까?</p>,
  );

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
            setSeconds(2);
            setModalContent(<p>찬스를 사용하시겠습니까?</p>);
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

  useEffect(() => {
    if (isOpen && !showButtons) {
      setModalContent(
        <>
          <p>찬스 내용</p>
          <p>{seconds} 초 후에 창이 닫힙니다.</p>
        </>,
      );
    }
  }, [seconds, isOpen, showButtons]);

  const handleOpen = () => {
    setIsOpen(true);
    setSeconds(2);
    setShowButtons(true);
    setModalContent(<p>찬스를 사용하시겠습니까?</p>);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowButtons(true);
    setSeconds(2);
    setModalContent(<p>찬스를 사용하시겠습니까?</p>);
  };

  const handleConfirm = () => {
    setSeconds(2);
    setShowButtons(false);
    setChance((prev) => Math.max(prev - 1, 0)); // 찬스 사용 시 기회 감소
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
        isDisabled={chance <= 0} // 기회가 0번 남았으면 비활성화
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
