import React from 'react';
import { Flex, GridItem, HStack, Image, Text } from '@chakra-ui/react';
import heartImg from '../../Asset/images/heart32.png';

const TopicCard = () => {
  return (
    <GridItem>
      <Flex
        flexDirection="column"
        alignItems="center"
        p={4}
        bg="gray.50"
        borderRadius="md"
        boxShadow="sm"
      >
        <Image
          src="https://via.placeholder.com/30"
          alt="topic"
          boxSize="72px"
          mb={2}
        />
        <Text mt={2} fontWeight="bold">
          Topic
        </Text>
        <HStack mt={2}>
          <Image src={heartImg} alt="heart" boxSize="16px" />
          <Text>9,999+</Text>
        </HStack>
      </Flex>
    </GridItem>
  );
};

export default TopicCard;
