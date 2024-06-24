import React, { ReactNode } from 'react';
import { BoxProps } from '@chakra-ui/react';

// Components/Common/CustomButton.tsx
export interface CustomButtonProps {
  variant?: string;
  text?: string;
  baseWidth?: number;
  width?: number;
  height?: number;
  onClick?: () => void;
  colorScheme?: string;
  soundSrc?: string;
  isDisabled?: boolean;
}

// Components/Common/CustomModal.tsx
export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'default' | 'info' | 'confirm';
  children?: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  isCentered?: boolean;
  size?: string;
  position?: BoxProps['position'];
  top?: BoxProps['top'];
  left?: BoxProps['left'];
  transform?: BoxProps['transform'];
  onConfirm?: () => void;
}

// Components/Game/Chance.tsx
export interface ChanceProps {
  chance: number;
  setChance: React.Dispatch<React.SetStateAction<number>>;
}

export interface AnswerProps {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  checkAnswer: (answer: string) => void;
}

// Game/Topic.tsx
export interface TopicType {
  topicId: number;
  name: string;
  imgSrc: string;
  title: string;
}

export interface Badge {
  topics: [
    {
      topicId: 0;
      title: 'string';
    },
  ];
}
