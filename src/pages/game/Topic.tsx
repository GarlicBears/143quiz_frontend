import React, { useEffect, useState } from 'react';
import { Flex, Grid, VStack, Box, Image, Text } from '@chakra-ui/react';
import badgeImg96 from '../../asset/images/badge96.png';
import CustomButton from '../../components/common/CustomButton';
import TopicCard from '../../components/common/TopicCard';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  topicIdState,
  titleState,
  questionsState,
  sessionIdState,
} from '../../recoil/atom';
import axiosInstance from '../../api/axiosInstance';
// TODO : 로컬에 저장된 이미지를 서버에 저장하기
import topicListLocal from '../../asset/topicList';

interface TopicType {
  topicId: number;
  title: string;
}

interface BadgeType {
  topicId: number;
  title: string;
}

const Topic = () => {
  const navigate = useNavigate();
  const [topicList, setTopicList] = useState<TopicType[]>([]);
  const [earnedBadgeList, setEarnedBadgeList] = React.useState<BadgeType[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [, setTopicId] = useRecoilState(topicIdState);
  const [, setTitle] = useRecoilState(titleState);
  const [, setQuestions] = useRecoilState(questionsState);
  const [, setSessionId] = useRecoilState<number>(sessionIdState);

  console.log('=====API URL:', process.env.REACT_APP_API_URL);
  // TODO : 지금까지 모은 뱃지 리스트 배열 불러오기(/game/badges), 획득한 뱃지가 없을 경우 기본 뱃지 이미지만 보여주기
  // - 이미 뱃지를 획득한 주제는 보여주지 않기(상단 안내문 밑에 이미 획득한 뱃지 이미지(/game/badges)를 보여주는 것으로 대체)
  useEffect(() => {
    axiosInstance.get('/game/badges').then((res) => {
      console.log(`획득뱃지수 : ${res.data.topics.length}`);
      if (res.data.topics.length === 0) {
        console.log('아직 획득한 뱃지가 없습니다.');
      } else {
        console.log(res.data.topics); // [{ "topicId": 0, "title": "string"}, { "topicId": 0, "title": "string"}, ...]
        setEarnedBadgeList(res.data.topics);
      }
    });

    // TODO : 뱃지 미획득 주제 리스트를 불러오기
    axiosInstance.get('/game/topics').then((res) => {
      setTopicList(res.data.topics);
      console.log('`뱃지 미획득 주제 리스트');
      console.log(res.data.topics);
    });
  }, []);

  // TODO : 주제를 선택한 후 게임 시작 버튼을 누르면 해당 topicID 의 게임으로 이동하기(/game/start/{topicId})
  // 주제를 선택하면 선택한 주제를 저장한 후,
  const handleTopicSelect = (topicId: number, title: string) => {
    console.log(topicId);
    setSelectedTopic({ id: topicId, title });
  };
  // 게임 시작 버튼을 누르면 해당 게임의 데이터를 받아와서 게임 컴포넌트로 이동하기
  const startGame = async () => {
    if (selectedTopic) {
      try {
        const res = await axiosInstance.get(`/game/start/${selectedTopic.id}`);
        console.log(`${res.data.topicId} : ${res.data.sessionId} 문제 리스트`);
        // 순차적으로 상태를 업데이트
        setTopicId(res.data.topicId);
        setSessionId(res.data.sessionId);
        setTitle(selectedTopic.title);
        setQuestions(res.data.game);

        // navigate는 상태 업데이트 후에 호출
        navigate('/game');
      } catch (error) {
        console.error('Error starting game:', error);
      }
    }
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
        {earnedBadgeList.length ? (
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
        ) : (
          <Text>
            아직 획득한 뱃지가 없어요. 게임을 통해 하트와 뱃지를 모아보세요!
          </Text>
        )}
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        gap={4}
        width={{ base: '100%', md: '720px' }}
      >
        {topicList.map((topic, index) => (
          <TopicCard
            key={index}
            title={topic.title}
            imgSrc={
              topicListLocal.find((t) => t.topicId === topic.topicId)?.imgSrc ||
              ''
            }
            onClick={() => handleTopicSelect(topic.topicId, topic.title)}
            selected={selectedTopic?.id === topic.topicId}
          />
        ))}
      </Grid>
      <Box
        position="fixed"
        bottom="100px"
        width="100%"
        textAlign="center"
        onClick={startGame}
      >
        <CustomButton />
      </Box>
    </VStack>
  );
};

export default Topic;
