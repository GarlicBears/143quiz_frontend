import React, { useEffect, useRef } from 'react';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import Add from '../Components/Common/Add';
import { Box, Button, Flex, Text, VStack, Image } from '@chakra-ui/react';
import topicList from '../Asset/topicList';
import congratulationImage from '../Asset/images/congratulation.png';
import congratulationSound from '../Asset/audios/glissando_up.mp3';

const EarnBadge = () => {
  const badgeName = '나무'; // 예시 값

  // badgeName에 해당하는 topic 찾기
  const topic = topicList.find((topic) => topic.name === badgeName);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(congratulationSound);
    audioRef.current
      .play()
      .then((r) => r)
      .catch((e) => e);
  }, []);

  return (
    <>
      <Header preventBack={true} />

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="360px"
          height="400px"
        >
          <Flex alignItems="flex-end">
            <Box
              width="100px"
              height="100px"
              bgImage={congratulationImage}
              bgSize="80px"
              bgPosition="right bottom"
              bgRepeat="no-repeat"
            />
            {topic ? (
              <Flex
                justifyContent="center"
                alignItems="center"
                width="160px"
                height="160px"
                bgColor="customOrange.300"
                borderRadius="full"
              >
                <Image
                  src={topic.imgSrc}
                  alt={badgeName}
                  width="100px"
                  height="100px"
                />
              </Flex>
            ) : (
              <Box width="160px" height="160px" bgColor="white" />
            )}
            <Box
              width="100px"
              height="100px"
              bgImage={congratulationImage}
              bgSize="80px"
              bgPosition="left top"
              bgRepeat="no-repeat"
              zIndex="0"
              transform="rotate(270deg)"
            />
          </Flex>
          <Text fontSize="2xl" marginY={4}>
            축하합니다!
          </Text>
          <Text mb={6}>
            <Text color="customOrange.500" display="inline">
              &apos;{badgeName}&apos; 박사{' '}
            </Text>
            뱃지를 획득하셨습니다!
          </Text>
        </Flex>

        {/*Buttons*/}
        <VStack gap={0}>
          <Button
            colorScheme="customOrange"
            variant="outline"
            mb={3}
            width={{ base: '360px', sm: '100%' }}
          >
            카톡으로 자랑하기
          </Button>
          <Button
            colorScheme="customOrange"
            variant="outline"
            mb={3}
            width={{ base: '100%', sm: '360px' }}
          >
            내가 모은 뱃지 확인
          </Button>
          <Button
            colorScheme="customOrange"
            variant="outline"
            mb={3}
            width={{ base: '100%', sm: '360px' }}
          >
            이만 끝내기
          </Button>
        </VStack>
      </Flex>

      <Add />
      <Footer />
    </>
  );
};

export default EarnBadge;
