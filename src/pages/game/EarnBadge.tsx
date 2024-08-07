import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Add from '../../components/common/Add';
import { Box, Button, Flex, Text, VStack, Image } from '@chakra-ui/react';
import congratulationImage from '../../asset/images/congratulation.png';
import congratulationSound from '../../asset/audios/glissando_up.mp3';
import {
  titleState,
  selectedTopicImgState,
  userInfoState,
} from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import UserBadge from '../user/UserBadge';
import { useDisclosure } from '@chakra-ui/react';
import useGameBlock from '../../hooks/useGameBlock';

const EarnBadge = () => {
  const badgeName = useRecoilValue(titleState);
  const selectedTopicImg = useRecoilValue(selectedTopicImgState);
  const userInfo = useRecoilValue(userInfoState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 시 이전 페이지가 game 페이지인 경우 뒤로가지 않는 기능
  useGameBlock();

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

  // 카카오톡 공유하기
  useEffect(() => {
    const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
    if (kakaoApiKey && window.Kakao) {
      window.Kakao.init(kakaoApiKey);
    } else {
      console.error('Kakao API Key is missing or invalid.');
    }
  }, []);

  const shareOnKakao = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '축하합니다!',
          description: `당신은 '${badgeName}' 박사 뱃지를 획득하셨습니다!`,
          imageUrl: selectedTopicImg,
          link: {
            mobileWebUrl: 'https://garlicbears.github.io/143quiz_frontend/',
            webUrl: 'https://garlicbears.github.io/143quiz_frontend/',
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: 'https://garlicbears.github.io/143quiz_frontend/',
              webUrl: 'https://garlicbears.github.io/143quiz_frontend/',
            },
          },
        ],
      });
    }
  };

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
            {selectedTopicImg ? (
              <Flex
                justifyContent="center"
                alignItems="center"
                width="160px"
                height="160px"
                bgColor="customOrange.300"
                borderRadius="full"
              >
                <Image
                  src={selectedTopicImg}
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
            onClick={shareOnKakao}
          >
            카톡으로 자랑하기
          </Button>
          <Button
            colorScheme="customOrange"
            variant="outline"
            mb={3}
            width={{ base: '100%', sm: '360px' }}
            onClick={onOpen}
          >
            내가 모은 뱃지 확인
          </Button>
          <Button
            colorScheme="customOrange"
            variant="outline"
            mb={3}
            width={{ base: '100%', sm: '360px' }}
            onClick={() => navigate('/topic')}
          >
            이만 끝내기
          </Button>
        </VStack>
      </Flex>
      <UserBadge userInfo={userInfo} isOpen={isOpen} onClose={onClose} />
      <Add />
      <Footer />
    </>
  );
};

export default EarnBadge;
