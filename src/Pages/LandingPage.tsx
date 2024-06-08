import React from 'react';
import { Flex } from '@chakra-ui/react';
import CustomButton from '../Components/Common/CustomButton';
import ModalButton from '../Components/Common/ModalButton';

const LandingPage = () => {
  return (
    <>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <CustomButton text="게임 시작" variant="solid" />
        <ModalButton
          type="default"
          buttonText="Modal button"
          variant="outline"
          img="https://via.placeholder.com/150"
          imgAlt="placeholder"
          contentText="모달 내용"
        />
      </Flex>
    </>
  );
};
export default LandingPage;
