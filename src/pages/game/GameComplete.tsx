import React, { useEffect, useRef } from 'react';
import { Button, Text, Image, Flex, keyframes } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import completedSound from '../../asset/audios/correct2.mp3';
import heartImage from '../../asset/images/heart32.png';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Add from '../../components/common/Add';
import {
  topicIdState,
  titleState,
  questionsState,
  sessionIdState,
} from '../../recoil/atom';
import axiosInstance from '../../api/axiosInstance';
import { useRecoilState } from 'recoil';

const GameComplete: React.FC = () => {
  const hearts = 20; // 예시 하트 수
  const maxHearts = 143;
  const badgeName = '동물';
  const userHasBadge = false; // 예시 값
  const heartCount = 6; // 예시 값

  const [currentTopicId, setCurrentopicId] = useRecoilState(topicIdState);
  const [newTitle, setNewTitle] = useRecoilState(titleState);
  const [newQuestions, setNewQuestions] = useRecoilState(questionsState);
  const [newSessionId, setNewSessionId] = useRecoilState(sessionIdState);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

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

  const handleContinue = async () => {
    console.log('게임 계속하기');
    // 게임 시작 버튼을 누르면 해당 게임의 데이터를 받아와서 게임 컴포넌트로 이동하기
    if (currentTopicId) {
      try {
        const res = await axiosInstance.get(`/game/start/${currentTopicId}`);
        console.log(`${res.data.topicId} : ${res.data.sessionId} 문제 리스트`);

        // 순차적으로 상태를 업데이트
        setCurrentopicId(res.data.topicId);
        setNewSessionId(res.data.sessionId);
        setNewTitle(res.data.title);
        setNewQuestions(res.data.game);

        // navigate는 상태 업데이트 후에 호출
        console.log('navigate to /game');
        // navigate('/game');
      } catch (error) {
        console.error('Error starting game:', error);
      }
    }
  };

  // heart pulse animation
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
          <Text> X {heartCount}</Text>
        </Flex>
        <Text fontSize="2xl" mb={4}>
          축하합니다!
        </Text>
        <Text mb={4}>
          지금까지{' '}
          <Text color="customOrange.500" display="inline">
            {hearts}개
          </Text>
          의 하트를 받았어요.
        </Text>
        {!userHasBadge ? (
          <Text mb={6} textAlign="center">
            <Text color="customOrange.500" display="inline">
              {maxHearts - hearts}개
            </Text>
            를 더 얻으면{' '}
            <Text color="customOrange.500" display="inline">
              &apos;{badgeName}&apos; 박사
            </Text>{' '}
            뱃지를 얻을 수 있어요.
          </Text>
        ) : (
          <Text mb={6}>
            이미{' '}
            <Text color="customOrange.500" display="inline">
              &apos;{badgeName}&apos; 박사
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
