import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Flex, SimpleGrid, Image } from '@chakra-ui/react';
//메인페이지:게임명, 게임설명, '게임 시작버튼으로 주제선택 이동 - 화면정의서와 기능정의서 'GB_GAME_001' 이 여기에 해당함.
const MainPage: React.FC = () => {
  return (
    <Box border="1px solid red" bg="blue.50" minH="100vh" py={10} px={5}>
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

export default MainPage;
