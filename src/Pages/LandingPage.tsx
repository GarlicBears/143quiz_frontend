import React from 'react';
import { Flex } from '@chakra-ui/react';
import CustomButton from '../Components/Common/Button';

const LandingPage = () => {
  return (
    <>
      <h1>자신있는 주제를 고르세요</h1>
      <h2>143개의 하트를 모으면 뱃지를 받을 수 있어요!</h2>
      <Flex justifyContent="center" alignItems="center">
        <CustomButton text="게임 시작" />
      </Flex>
    </>
  );
};
export default LandingPage;
