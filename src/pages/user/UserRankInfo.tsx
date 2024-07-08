import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  Box,
  Grid,
  GridItem,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';
import badgeIcon from '../../asset/images/badge48.png';
import UserRank from './UserRank'; // Adjust the import path as necessary

interface TopicType {
  topicId: number;
  title: string;
  heartsCount: number;
  totalQuestionsCount: number;
  topicImage: string;
}

const UserRankInfo: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [rankingData, setRankingData] = useState([]);
  const {
    isOpen: isRankingOpen,
    onOpen: onRankingOpen,
    onClose: onRankingClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axiosInstance.get('/game/topics');
        setTopics(response.data.topics || []);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  const handleBadgeClick = async (topic: TopicType) => {
    setSelectedTopic(topic);
    onRankingOpen();

    try {
      const response = await axiosInstance.get(
        `/game/rankings/${topic.topicId}`,
      );
      setRankingData(response.data);
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    }
  };

  return (
    <Box p={4}>
      {/*<Flex alignItems="center" justifyContent="center" mb={4}>*/}
      {/*  <Image src={badgeIcon} boxSize="30px" mr={2} />*/}
      {/*  <Text>내가 모은 뱃지</Text>*/}
      {/*</Flex>*/}

      <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={5}>
        {topics.map((topic, index) => (
          <GridItem key={index} w="100%">
            <Box
              borderRadius="2xl"
              border="1px solid orange"
              overflow="hidden"
              textAlign="center"
              w="100%"
              p={3}
              cursor="pointer"
              onClick={() => handleBadgeClick(topic)}
            >
              <Box
                border="1px solid orange"
                borderRadius="full"
                bg="orange.100"
                boxSize="80px"
                m="auto"
              >
                <Image
                  src={topic.topicImage}
                  borderRadius="full"
                  boxSize="50px"
                  m="auto"
                  mt={4}
                />
              </Box>
              <Text mt={2}>{topic.title}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <UserRank
        isOpen={isRankingOpen}
        onClose={onRankingClose}
        topicName={selectedTopic?.title || ''}
        topic={selectedTopic}
        currentUserNickname={'User1'}
        rankingData={rankingData}
      />
    </Box>
  );
};

export default UserRankInfo;
