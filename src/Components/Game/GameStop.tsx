import React from 'react';
import Modal from '../Common/Modal';
interface GameStopProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameStop: React.FC<GameStopProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} type="confirm">
      <h2>게임을 종료하시겠습니까?</h2>
      <p>게임을 종료하면 현재 진행 중인 게임 기록은 사라집니다.</p>
    </Modal>
  );
};

export default GameStop;
