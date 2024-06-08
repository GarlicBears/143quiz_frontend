import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface CustomButtonProps {
  variant?: string;
  text?: string;
  width?: number;
  height?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'solid',
  text = '게임하기',
  width = 400,
  height = 80,
}) => {
  return (
    <ButtonGroup>
      <Button
        bg="var(--primary-color)"
        color="var(--text-color-white)"
        fontSize="1.5rem"
        variant={variant}
        width={`${width}px`}
        height={`${height}px`}
        _hover={{ bg: 'var(--secondary-color)' }}
      >
        {text}
      </Button>
    </ButtonGroup>
  );
};

export default CustomButton;
