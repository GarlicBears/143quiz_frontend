import React, { useEffect } from 'react';
import { Flex, Grid, VStack, Box, Image, Text } from '@chakra-ui/react';
import badgeImg96 from '../../Asset/images/badge96.png';
import CustomButton from '../../Components/Common/CustomButton';
import TopicCard from '../../Components/Common/TopicCard';
import topicList from '../../Asset/topicList';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/axiosInstance';

const Topic = () => {
  const navigate = useNavigate();
  // const [topicList, setTopicList] = useState(topicList);
  const [selectedTopic, setSelectedTopic] = React.useState('');

  console.log('=====API URL:', process.env.REACT_APP_API_URL);
  // TODO : 지금까지 모은 뱃지 리스트 배열 불러오기(/game/badges), 획득한 뱃지가 없을 경우 기본 뱃지 이미지만 보여주기
  // - 이미 뱃지를 획득한 주제는 보여주지 않기(상단 안내문 밑에 이미 획득한 뱃지 이미지(/game/badges)를 보여주는 것으로 대체)
  useEffect(() => {
    axiosInstance.get('/game/badges').then((res) => {
      console.log(`획득뱃지수 : ${res.data.topics.length}`);
    });

    // TODO : 뱃지 미획득 주제 리스트를 불러오기
    axiosInstance.get('/game/topics').then((res) => {
      // setTopicList(res.data);
      console.log('`뱃지 미획득 주제 리스트');
      console.log(res.data.topics);
    });
  }, []);

  // TODO : 주제를 선택한 후 게임 시작 버튼을 누르면 해당 topicID 의 게임으로 이동하기(/game/start/{topicId})
  const handleTopicSelect = (topicName: string) => {
    console.log(topicName);
    setSelectedTopic(topicName);
    axiosInstance.get(`/game/start/${0}`).then((res) => {
      console.log('랜덤 게임 문제 리스트');
      console.log(res.data.game);
    });
  };

  return (
    <VStack spacing={6} align="center" width="100%">
      <Flex justifyContent="center" width="100%" fontWeight="bold" p={2}>
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
              모은 뱃지
            </Box>
          ))}
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        gap={4}
        width={{ base: '100%', md: '720px' }}
      >
        {topicList.map((topic, index) => (
          <TopicCard
            key={index}
            name={topic.name}
            imgSrc={topic.imgSrc}
            onClick={() => handleTopicSelect(topic.name)}
          />
        ))}
      </Grid>
      <Box
        position="fixed"
        bottom="100px"
        width="100%"
        textAlign="center"
        onClick={() => navigate('/game')}
      >
        <CustomButton />
      </Box>
    </VStack>
  );
};

export default Topic;
