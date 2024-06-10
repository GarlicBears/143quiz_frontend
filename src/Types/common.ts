import React, { ReactNode } from 'react';

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

// Components/Common/ModalButton.tsx
interface ModalButtonProps {
  type?: 'default' | 'info' | 'confirm';
  buttonText?: string;
  variant?: string;
  img?: string;
  imgAlt?: string;
  contentText?: string;
}

// Components/Common/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'default' | 'info' | 'confirm';
  children?: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  isCentered?: boolean;
  size?: string;
}

// Components/Game/Chance.tsx
interface ChanceProps {
  chance: number;
  setChance: React.Dispatch<React.SetStateAction<number>>;
}

export type { CustomButtonProps, ModalButtonProps, ModalProps, ChanceProps };
