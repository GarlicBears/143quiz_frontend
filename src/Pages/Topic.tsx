import React from 'react';
import { Flex, Grid, VStack, Box, Image, Text } from '@chakra-ui/react';
import badgeImg96 from '../Asset/images/badge96.png';
import CustomButton from '../Components/Common/CustomButton';
import TopicCard from '../Components/Common/TopicCard';

const Topic = () => {
  return (
    <VStack spacing={6} align="center" width="100%">
      <Flex justifyContent="center" width="100%" bg="gray.200" p={4}>
        자신있는 주제를 고르세요
      </Flex>

      <Flex
        flexDirection="column"
        align="center"
        width={{ base: '360px', md: '720px' }}
        p={4}
        bg="gray.50"
        borderRadius="md"
        boxShadow="md"
      >
        <Image src={badgeImg96} alt="badge" boxSize="96px" />
        <Text mt={4} textAlign="center" fontWeight="bold">
          143개의 하트를 모으면 박사 뱃지를 받을 수 있어요!
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          overflowX="auto"
          mt={4}
          width="100%"
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              boxSize="72px"
              bg="red.500"
              mr={2}
              flexShrink="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              boxShadow="sm"
              color="white"
              fontWeight="bold"
            >
              Its Box!
            </Box>
          ))}
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        gap={4}
        width={{ base: '100%', md: '720px' }}
      >
        {[...Array(8)].map((_, index) => (
          <TopicCard key={index} />
        ))}
      </Grid>

      <Box position="fixed" bottom="100px" width="100%" textAlign="center">
        <CustomButton />
      </Box>
    </VStack>
  );
};

export default Topic;
