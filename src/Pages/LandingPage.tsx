import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <Box border="1px solid red" bg="blue.50" minH="100vh" py={10} px={5}>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={2}>
        <Box bg="blue.400" p={4} borderRadius="md">
          <Text fontSize="3xl" color="white" textAlign="center">
            1
          </Text>
        </Box>
        <Box bg="pink.500" transform="rotate(-20deg)" p={4} borderRadius="md">
          <Text fontSize="3xl" color="white" textAlign="center">
            4
          </Text>
        </Box>
        <Box bg="green.600" transform="rotate(20deg)" p={4} borderRadius="md">
          <Text fontSize="3xl" color="white" textAlign="center">
            3
          </Text>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 2, sm: 4, md: 4 }} mt={5} gap={2}>
        <Box bg="orange.300" p={4} borderRadius="md">
          <Text fontSize="3xl" color="black" textAlign="center">
            초
          </Text>
        </Box>
        <Box bg="orange.300" p={4} borderRadius="md">
          <Text fontSize="3xl" color="black" textAlign="center">
            성
          </Text>
        </Box>
        <Box bg="orange.300" p={4} borderRadius="md">
          <Text fontSize="3xl" color="black" textAlign="center">
            게
          </Text>
        </Box>
        <Box bg="orange.300" p={4} borderRadius="md">
          <Text fontSize="3xl" color="black" textAlign="center">
            임
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default LandingPage;
