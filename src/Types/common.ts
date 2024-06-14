import React, { ReactNode } from 'react';
import { BoxProps } from '@chakra-ui/react';

// Components/Common/CustomButton.tsx
interface CustomButtonProps {
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
interface CustomModalProps {
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
interface ChanceProps {
  chance: number;
  setChance: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerProps {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  checkAnswer: (answer: string) => void;
}

export type { CustomButtonProps, CustomModalProps, ChanceProps, AnswerProps };
