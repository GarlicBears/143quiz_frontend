import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';
import badgeIcon from '../../asset/images/badge48.png';

interface BadgeType {
  topicId: number;
  title: string;
  heartsCount: number;
  totalQuestionsCount: number;
  topicImage: string;
}

interface Topic {
  topicId: number;
  title: string;
  name: string;
  topicImage: string;
}

interface UserInfo {
  nickname: string;
  gender: string;
  location: string;
  imageUrl: string;
  birthYear: number;
}

interface UserBadgeProps {
  userInfo: UserInfo;
  isOpen: boolean;
  onClose: () => void;
  headerBgColor?: string;
  headerTextColor?: string;
  bodyBgColor?: string;
  bodyTextColor?: string;
}

function UserBadge({
  userInfo,
  isOpen,
  onClose,
  headerBgColor = 'white',
  headerTextColor = 'black',
  bodyBgColor = 'white',
  bodyTextColor = 'black',
}: UserBadgeProps) {
  const [earnedBadgeList, setEarnedBadgeList] = useState<BadgeType[]>([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axiosInstance.get('/game/badges');
        setEarnedBadgeList(response.data.topics || []);
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    fetchBadges();
  }, [userInfo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={headerBgColor} color={headerTextColor}>
          <Flex alignItems="center" justifyContent="center">
            <Image src={badgeIcon} boxSize="30px" mr={2} />
            <Text>내가 모은 뱃지</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          bg={bodyBgColor}
          color={bodyTextColor}
          maxHeight="calc(100vh - 210px)"
          overflowY="auto"
        >
          {earnedBadgeList.length ? (
            <Flex
              justifyContent="center"
              alignItems="center"
              mt={4}
              width="100%"
              flexWrap="wrap"
            >
              {earnedBadgeList.map((earnedBadge, index) => {
                const imgSrc = earnedBadge.topicImage || '';
                return (
                  <Box
                    key={index}
                    boxSize="72px"
                    backgroundImage={imgSrc}
                    bgColor={imgSrc ? 'customOrange.100' : 'gray.300'}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    m={2}
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
            <Text textAlign="center">
              아직 획득한 뱃지가 없어요. 게임을 통해 하트와 뱃지를 모아보세요!
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserBadge;
