import React from 'react';
import { Flex, GridItem, HStack, Image, Text } from '@chakra-ui/react';
import heartImg from '../../Asset/images/heart32.png';

interface TopicCardProps {
  name: string;
  imgSrc: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ name, imgSrc }) => {
  return (
    <GridItem>
      <Flex
        flexDirection="column"
        alignItems="center"
        p={4}
        bg="gray.50"
        borderRadius="md"
        boxShadow="sm"
        transition="transform 0.2s, border 0.2s"
        _hover={{
          transform: 'scale(1.02)',
          borderColor: 'customOrange.400',
          boxShadow: 'lg',
        }}
        _active={{
          transform: 'scale(0.98)',
          borderColor: 'customOrange.600',
          boxShadow: 'md',
        }}
        borderWidth="1px"
        cursor="pointer"
      >
        <Image src={imgSrc} alt={name} boxSize="72px" mb={2} />
        <Text mt={2} fontWeight="bold">
          {name}
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
