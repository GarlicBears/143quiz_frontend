import React, { useEffect, useRef } from 'react';
import { Button, Text, Image, Flex, keyframes } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import completedSound from '../Asset/audios/correct2.mp3';
import heartImage from '../Asset/images/heart32.png';
import Footer from '../Components/Common/Footer';
import Header from '../Components/Common/Header';
import Add from '../Components/Common/Add';

const GameComplete: React.FC = () => {
  const hearts = 20; // 예시 하트 수
  const maxHearts = 143;
  const badgeName = '동물';
  const userHasBadge = false; // 예시 값
  const heartCount = 6; // 예시 값

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

  const handleContinue = () => {
    navigate('/game');
  };
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
