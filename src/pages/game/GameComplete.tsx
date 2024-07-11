import React, { useEffect, useRef } from 'react';
import { Button, Text, Image, Flex, keyframes } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import completedSound from '../../asset/audios/correct2.mp3';
import heartImage from '../../asset/images/heart32.png';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Add from '../../components/common/Add';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questionsState,
  sessionIdState,
  titleState,
  topicIdState,
} from '../../recoil/atoms';
import axiosInstance from '../../api/axiosInstance';
import useGameBlock from '../../hooks/useGameBlock';

const GameComplete: React.FC = () => {
  const title = useRecoilValue<string>(titleState);
  const currentTopicID = useRecoilValue(topicIdState);
  const [, setSessionId] = useRecoilState<number>(sessionIdState);
  const [, setQuestions] = useRecoilState(questionsState);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userHeartsCount, totalQuestions } = location.state || {};

  // 뒤로가기 버튼 클릭 시 이전 페이지가 game 페이지인 경우 뒤로가지 않는 기능
  useGameBlock();

  useEffect(() => {
    // 완료 효과음 재생
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(completedSound);
    audioRef.current
      .play()
      .then((r) => r)
      .catch((e) => e);
  }, []);

  const handleEndGame = () => {
    navigate('/topic');
  };

  // '계속하기' 버튼 클릭 시 현재 topicId 로 새 게임(새로운 세션) 불러오기
  const handleContinue = async () => {
    console.log('currentTopicID', currentTopicID);

    try {
      const res = await axiosInstance.get(`/game/start/${currentTopicID}`);
      console.log(res.data);
      // 순차적으로 상태를 업데이트
      setSessionId(res.data.sessionId);
      setQuestions(res.data.game);
      navigate('/game');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 하트 pulse 애니메이션
  const pulse = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  `;
  return (
    <>
      <Header preventBack={true} />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        py={16}
        px={6}
      >
        <Flex justifyContent="center" alignItems="center" mb={6}>
          <Image
            src={heartImage}
            alt="Heart"
            boxSize="32px"
            mx={2}
            animation={`${pulse} 1.5s infinite`}
          />
          <Text> X {userHeartsCount}</Text>
        </Flex>
        <Text fontSize="2xl" mb={4}>
          축하합니다!
        </Text>
        <Text mb={4}>
          지금까지
          <Text color="customOrange.500" display="inline">
            {userHeartsCount}개
          </Text>
          의 하트를 받았어요.
        </Text>
        {totalQuestions - userHeartsCount > 0 ? (
          <Text mb={6} textAlign="center">
            <Text color="customOrange.500" display="inline">
              {totalQuestions - userHeartsCount}개
            </Text>
            를 더 얻으면
            <Text color="customOrange.500" display="inline">
              &apos;{title}&apos; 박사
            </Text>{' '}
            뱃지를 얻을 수 있어요.
          </Text>
        ) : (
          <Text mb={6}>
            이미
            <Text color="customOrange.500" display="inline">
              &apos;{title}&apos; 박사
            </Text>
            뱃지를 획득하셨어요.
          </Text>
        )}
        <Button
          colorScheme="customOrange"
          variant="outline"
          onClick={handleEndGame}
          mb={3}
          width={{ base: '100%', sm: '360px' }}
        >
          이만 끝내기
        </Button>
        <Button
          colorScheme="customOrange"
          onClick={handleContinue}
          width={{ base: '100%', sm: '360px' }}
        >
          계속하기
        </Button>
        <Add />
        <Footer />
      </Flex>
    </>
  );
};

export default GameComplete;
