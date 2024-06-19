import React from 'react';
import {
  Text,
  Image,
  Box,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import dogImg from '../../Asset/images/topic/dog.png';
import clownFishImg from '../../Asset/images/topic/clown-fish.png';
import forestImg from '../../Asset/images/topic/forest.png';
import countryImg from '../../Asset/images/topic/country.png';
import flowerImg from '../../Asset/images/topic/flower.png';
import fruitImg from '../../Asset/images/topic/fruit.png';
import sportsImg from '../../Asset/images/topic/running.png';
import koreanSingerImg from '../../Asset/images/topic/singer-female.png';
import hospitalImg from '../../Asset/images/topic/hospital.png';
import storeImg from '../../Asset/images/topic/store.png';
import workImg from '../../Asset/images/topic/work.png';
import filmImg from '../../Asset/images/topic/film.png';
import soyImg from '../../Asset/images/topic/soy.png';
import geographyImg from '../../Asset/images/topic/geography.png';
import globeImg from '../../Asset/images/topic/globe.png';
import riceBowlImg from '../../Asset/images/topic/rice-bowl.png';
import badgeIcon from '../../Asset/images/badge48.png';

// 뱃지의 유니크 ID와 다양한 레이블
const badges = [
  { label: '동물', imgSrc: dogImg },
  { label: '해양동물', imgSrc: clownFishImg },
  { label: '나무', imgSrc: forestImg },
  { label: '국가', imgSrc: countryImg },
  { label: '꽃', imgSrc: flowerImg },
  { label: '과일', imgSrc: fruitImg },
  { label: '스포츠', imgSrc: sportsImg },
  { label: '한국 가수', imgSrc: koreanSingerImg },
  { label: '상점', imgSrc: storeImg },
  { label: '병원, 약, 병', imgSrc: hospitalImg },
  { label: '직업', imgSrc: workImg },
  { label: '음식', imgSrc: riceBowlImg },
  { label: '사자성어', imgSrc: globeImg },
  { label: '가전,가구', imgSrc: geographyImg },
  { label: '취미', imgSrc: filmImg },
  { label: '야채', imgSrc: soyImg },
];

function UserBadge() {
  const { isOpen, onClose } = useDisclosure({ isOpen: true }); // 모달을 기본적으로 열린 상태로 초기화

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center" justifyContent="center">
            <Image src={badgeIcon} boxSize="30px" mr={2} />
            <Text>내가 모은 뱃지</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxHeight="calc(100vh - 210px)" overflowY="auto">
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            {badges.map((badge) => (
              <GridItem key={badge.label} w="100%">
                <Box
                  // borderWidth="10px"
                  borderRadius="xl"
                  border="1px solid black"
                  overflow="hidden"
                  textAlign="center"
                  p={3}
                >
                  <Box
                    border="1px solid"
                    borderRadius="full"
                    bg="orange.100"
                    boxSize="80px"
                    m="auto"
                  >
                    <Image
                      src={badge.imgSrc}
                      border="0px solid black"
                      borderRadius="full"
                      boxSize="50px"
                      m="auto"
                      mt={4}
                    />
                  </Box>
                  <Text mt={2}>{badge.label}</Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserBadge;
