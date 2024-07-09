import React from 'react';
import { Box } from '@chakra-ui/react';

const Add = () => {
  return (
    <>
      <Box
        width="100%"
        height="50px"
        textAlign="center"
        bg="var(--bg-color-gray)"
        position="fixed"
        bottom="50px"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        Add
      </Box>
    </>
  );
};
export default Add;
