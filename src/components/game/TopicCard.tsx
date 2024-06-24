import React from 'react';
import { Flex, GridItem, HStack, Image, Text } from '@chakra-ui/react';
import heartImg from '../../asset/images/heart32.png';

interface TopicCardProps {
  title: string;
  imgSrc: string;
  onClick?: () => void;
  selected: boolean;
}

// TODO : 뱃지 미획득 주제 목록 리스트 불러오기(/game/topics), 주제별로 유저가 획득한 하트 수 불러오기
// - 주제 별로 유저가 획득한 하트 수 표시
//   - 배지 미획득 주제 : n / 143

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  imgSrc,
  onClick,
  selected,
}) => {
  return (
    <GridItem onClick={onClick}>
      <Flex
        flexDirection="column"
        alignItems="center"
        p={4}
        bg="gray.50"
        borderRadius="md"
        border={selected ? '4px solid orange' : '0'}
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
        <Image src={imgSrc} alt={title} boxSize="72px" mb={2} />
        <Text mt={2} fontWeight="bold">
          {title}
        </Text>
        <HStack mt={2}>
          <Image src={heartImg} alt="heart" boxSize="16px" />
          <Text>99 / 143</Text>
        </HStack>
      </Flex>
    </GridItem>
  );
};

export default TopicCard;
