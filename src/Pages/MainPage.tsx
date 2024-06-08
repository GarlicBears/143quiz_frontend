import React from 'react';
import { Box } from '@chakra-ui/react';
import CustomButton from '../Components/Common/CustomButton';

// 게임명, 게임 설명, 시연영상, 게임시작버튼, 상단헤더 홈버튼
function MainPage() {
  const handleGameStart = () => {
    // 게임 시작 버튼 클릭 시 실행할 함수
    console.log('게임 시작!');
  };

  return (
    <>
      <Box border="1px solid blue">
        <Box>헤더</Box>
        <Box>초성게임</Box>
        <Box>게임 설명 슬릭으로</Box>
        <Box>진행방향</Box>
        <CustomButton
          text="게임 시작"
          onClick={handleGameStart}
          variant="solid"
          colorScheme="customOrange"
          width={400}
          height={80}
        />
      </Box>
    </>
  );
}

export default MainPage;
