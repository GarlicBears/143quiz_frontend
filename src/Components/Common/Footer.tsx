import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <>
      <Box
        as="footer"
        width="100%"
        height="50px"
        padding="4"
        bg="var(--bg-color)"
        color="var(--text-color)"
        textAlign="center"
        position="fixed"
        bottom="0"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        &copy; 2024 Garlic Bears. All rights reserved.
      </Box>
    </>
  );
};
export default Footer;
