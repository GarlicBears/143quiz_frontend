import React, { useEffect, useState } from 'react';
import { Flex, Grid, VStack, Box, Image, Text } from '@chakra-ui/react';
import badgeImg96 from '../../asset/images/badge96.png';
import CustomButton from '../../components/common/CustomButton';
import TopicCard from '../../components/game/TopicCard';
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
  heartsCount: number;
  totalQuestionsCount: number;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [badgesRes, topicsRes] = await Promise.all([
          axiosInstance.get('/game/badges'),
          axiosInstance.get('/game/topics'),
        ]);

        setEarnedBadgeList(badgesRes.data.topics || []);
        setTopicList(topicsRes.data.topics || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // 데이터가 모두 로드된 후 로딩 상태 해제
      }
    };

    fetchData();
  }, []);

  // 주제를 선택하면 선택한 주제를 저장한 후,
  const handleTopicSelect = (topicId: number, title: string) => {
    console.log(topicId, title);
    setSelectedTopic({ id: topicId, title });
  };
  // 게임 시작 버튼을 누르면 해당 게임의 데이터를 받아와서 게임 컴포넌트로 이동하기
  // todo : GameComplete 에서 같은 topicId 로 새 게임(새로운 세션) 불러오기
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
            {earnedBadgeList.map((earnedBadge, index) => {
              const imgSrc =
                topicListLocal.find(
                  (topic) => topic.topicId === earnedBadge.topicId,
                )?.imgSrc || '';
              return (
                <Box
                  key={index}
                  boxSize="72px"
                  backgroundImage={imgSrc}
                  bgColor={imgSrc ? 'customOrange.100' : 'gray.300'}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
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
                  {earnedBadge.title}
                </Box>
              );
            })}
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
        <TopicCard
          key={0}
          title={topicListLocal[0].name}
          imgSrc={topicListLocal[0].imgSrc}
          onClick={() =>
            handleTopicSelect(topicListLocal[0].topicId, topicListLocal[0].name)
          }
          selected={selectedTopic?.id === topicListLocal[0].topicId}
          isLoading={isLoading}
        />
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
            isLoading={isLoading}
            heartsCount={topic.heartsCount}
            totalQuestion={topic.totalQuestionsCount}
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
        <CustomButton disabled={!selectedTopic} />
      </Box>
    </VStack>
  );
};

export default Topic;
