import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { CustomButtonProps } from '../../types/common';

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'solid',
  text = '게임하기',
  width = 400,
  height = 80,
  onClick,
  colorScheme = 'customOrange',
  soundSrc,
  disabled,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (soundSrc) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(soundSrc);
      audioRef.current.play();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      disabled={disabled}
      colorScheme={colorScheme}
      fontSize="1.5rem"
      variant={variant}
      width={{ base: '160px', md: `${width}px` }}
      height={`${height}px`}
      onClick={handleClick}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      {text}
    </Button>
  );
};

export default React.memo(CustomButton);
