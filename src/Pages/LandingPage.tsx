import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

const LandingPage: React.FC = () => {
  return (
    <Box border="1px solid red" bg="blue.50" minH="100vh" py={10} px={5}>
      {/*<SimpleGrid columns={3}>*/}
      {/*  <Box*/}
      {/*    ml={20}*/}
      {/*    mt="100px"*/}
      {/*    bg="purple.500"*/}
      {/*    p={5}*/}
      {/*    borderRadius="md"*/}
      {/*    w="100px"*/}
      {/*    h="100px"*/}
      {/*  >*/}
      {/*    <Text fontSize="4xl" color="white" textAlign="center">*/}
      {/*      1*/}
      {/*    </Text>*/}
      {/*  </Box>*/}

      {/*  <Box*/}
      {/*    ml={-20}*/}
      {/*    mt="50px"*/}
      {/*    mb="50px"*/}
      {/*    bg="blue.500"*/}
      {/*    p={5}*/}
      {/*    borderRadius="md"*/}
      {/*    border="3px solid black"*/}
      {/*    transform="rotate(20deg)"*/}
      {/*    width="100px" // 너비 설정*/}
      {/*    height="100px" // 높이 설정*/}
      {/*  >*/}
      {/*    <Text fontSize="4xl" color="white" textAlign="center">*/}
      {/*      4*/}
      {/*    </Text>*/}
      {/*  </Box>*/}

      {/*  <Box*/}
      {/*    ml={-60}*/}
      {/*    mb="30px"*/}
      {/*    mt="80px"*/}
      {/*    bg="pink.500"*/}
      {/*    p={5}*/}
      {/*    borderRadius="md"*/}
      {/*    width="100px"*/}
      {/*    height="100px"*/}
      {/*    transform="rotate(-10deg)"*/}
      {/*  >*/}
      {/*    <Text fontSize="4xl" color="white" textAlign="center">*/}
      {/*      3*/}
      {/*    </Text>*/}
      {/*  </Box>*/}
      {/*</SimpleGrid>*/}
      <SimpleGrid columns={3}>
        <Box bg="blue.400" p={-4} borderRadius="md" w="50px" h="50px">
          <Text fontSize="3xl" color="white" textAlign="center">
            1
          </Text>
        </Box>
        <Box
          ml={-10}
          bg="pink.500"
          transform="rotate(-20deg)"
          p={-4}
          borderRadius="md"
          w="50px"
          h="50px"
        >
          <Text fontSize="3xl" color="white" textAlign="center">
            4
          </Text>
        </Box>
        <Box
          ml={-20}
          bg="green.600"
          transform="rotate(20deg)"
          p={-4}
          borderRadius="md"
          w="50px"
          h="50px"
        >
          <Text fontSize="3xl" color="white" textAlign="center">
            3
          </Text>
        </Box>
      </SimpleGrid>
      {/*--------------------143--------------------------*/}
      <SimpleGrid columns={4} mt={5}>
        <Box bg="orange.300" p={-4} borderRadius="md" w="50px" h="50px">
          <Text fontSize="3xl" color="black" textAlign="center">
            초
          </Text>
        </Box>
        <Box ml={-5} bg="orange.300" p={-4} borderRadius="md" w="50px" h="50px">
          <Text fontSize="3xl" color="black" textAlign="center">
            성
          </Text>
        </Box>
        <Box ml={-9} bg="orange.300" p={-4} borderRadius="md" w="50px" h="50px">
          <Text fontSize="3xl" color="black" textAlign="center">
            게
          </Text>
        </Box>
        <Box
          ml={-12}
          bg="orange.300"
          p={-4}
          borderRadius="md"
          w="50px"
          h="50px"
        >
          <Text fontSize="3xl" color="black" textAlign="center">
            임
          </Text>
        </Box>
      </SimpleGrid>

      {/*<SimpleGrid columns={4} mr={250}>*/}
      {/*  <Box bg="green.400" p={5} borderRadius="md" w="100px" h="100px">*/}
      {/*    <Text fontSize="3xl" color="black" textAlign="center">*/}
      {/*      초*/}
      {/*    </Text>*/}
      {/*  </Box>*/}
      {/*  <Box bg="green.400" p={5} borderRadius="md" w="100px" h="100px">*/}
      {/*    <Text fontSize="3xl" color="black" textAlign="center">*/}
      {/*      성*/}
      {/*    </Text>*/}
      {/*  </Box>*/}
      {/*  <Box bg="green.400" p={5} borderRadius="md" w="100px" h="100px">*/}
      {/*    <Text fontSize="3xl" color="black" textAlign="center">*/}
      {/*      게*/}
      {/*    </Text>*/}
      {/*  </Box>*/}
      {/*  <Box bg="green.400" p={5} borderRadius="md" w="100px" h="100px">*/}
      {/*    <Text fontSize="3xl" color="black" textAlign="center">*/}
      {/*      임*/}
      {/*    </Text>*/}
      {/*  </Box>*/}
      {/*</SimpleGrid>*/}
    </Box>
  );
};
export default LandingPage;
