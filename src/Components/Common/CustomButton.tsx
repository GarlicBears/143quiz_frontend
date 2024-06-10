import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { CustomButtonProps } from '../../Types/common';

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'solid',
  text = '게임하기',
  baseWidth = 280,
  width = 400,
  height = 80,
  onClick,
  colorScheme = 'customOrange',
  soundSrc,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (soundSrc && audioRef.current) {
      audioRef.current.play();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Button
        colorScheme={colorScheme}
        fontSize="1.5rem"
        variant={variant}
        width={{ base: `${baseWidth}px`, md: `${width}px` }}
        height={`${height}px`}
        onClick={handleClick}
      >
        {text}
      </Button>
      {soundSrc && <audio ref={audioRef} src={soundSrc} />}
    </>
  );
};

export default React.memo(CustomButton);
