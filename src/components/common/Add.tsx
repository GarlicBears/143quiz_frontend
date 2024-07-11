import React from 'react';
import { Box } from '@chakra-ui/react';
import addImg from '../../asset/images/add2.png';

const Add = () => {
  return (
    <>
      <Box
        width="100%"
        height="50px"
        textAlign="center"
        bg="white"
        bgImg={addImg}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="contain"
        position="fixed"
        bottom="50px"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      />
    </>
  );
};
export default Add;
