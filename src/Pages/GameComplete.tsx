import React, { useEffect, useRef } from 'react';
import { Button, Text, Image, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import completedSound from '../Asset/audios/correct2.mp3';
import badgeImage from '../Asset/images/badge96.png';

const GameComplete: React.FC = () => {
  const hearts = 20; // 예시 하트 수
  const maxHearts = 143;
  const badgeName = '동물';
  const userHasBadge = false; // 예시 값

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 완료 효과음 재생
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(completedSound);
    audioRef.current.play();
  }, []);

  const handleEndGame = () => {
    navigate('/select-topic');
  };

  const handleContinue = () => {
    navigate('/next-stage');
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      py={10}
      px={6}
    >
      <Image src={badgeImage} alt="Badge" boxSize="50px" mx="auto" mb={6} />
      <Text fontSize="2xl" mb={4}>
        축하합니다!
      </Text>
      <Text mb={4}>지금까지 {hearts}개의 하트를 받았어요.</Text>
      {!userHasBadge ? (
        <Text mb={6}>
          {maxHearts - hearts}개를 더 얻으면 &apos;{badgeName}&apos; 박사 뱃지를
          얻을 수 있어요.
        </Text>
      ) : (
        <Text mb={6}>
          이미 &apos;{badgeName}&apos; 박사 뱃지를 획득하셨어요.
        </Text>
      )}
      <Button
        colorScheme="customOrange"
        variant="outline"
        onClick={handleEndGame}
        mb={3}
      >
        이만 끝내기
      </Button>
      <Button colorScheme="customOrange" onClick={handleContinue}>
        계속하기
      </Button>
    </Flex>
  );
};

export default GameComplete;
