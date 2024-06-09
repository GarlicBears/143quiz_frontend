import React from 'react';
import { Box, Flex, Center, VStack } from '@chakra-ui/react';
import CustomButton from '../Components/Common/CustomButton';
import Header from '../Components/Common/Header';

function MainPage() {
  const handleGameStart = () => {
    console.log('게임 시작!');
  };

  return (
    <>
      <Header />
      <Center>
        <Flex direction="column" align="center" width="80%">
          <VStack
            border="1px solid blue"
            spacing={4}
            p={5}
            align="stretch"
            w="100%"
            bg="gray.50"
          >
            <Box>헤더</Box>
            <Box>초성게임</Box>
            <Box>게임 설명 슬릭으로</Box>
            <Box>진행방향</Box>
            <CustomButton
              text="게임 시작"
              onClick={handleGameStart}
              variant="solid"
              colorScheme="customOrange"
            />
          </VStack>
        </Flex>
      </Center>
    </>
  );
}

export default MainPage;
