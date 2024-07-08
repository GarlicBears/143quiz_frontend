import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';
import badgeIcon from '../../asset/images/badge48.png';
import UserRank from './UserRank';
import topicListLocal from '../../asset/topicList';

interface BadgeType {
  topicId: number;
  title: string;
  heartsCount: number;
  totalQuestionsCount: number;
}

interface Topic {
  topicId: number;
  title: string;
  imgSrc: string;
  name: string;
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
}

function UserBadge({ userInfo }: UserBadgeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [earnedBadgeList, setEarnedBadgeList] = useState<BadgeType[]>([]);
  const {
    isOpen: isRankingOpen,
    onOpen: onRankingOpen,
    onClose: onRankingClose,
  } = useDisclosure();
  const [rankingData, setRankingData] = useState([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);

  useEffect(() => {
    console.log('userInfo:', userInfo);
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

  const handleBadgeClick = async (topic: Topic) => {
    setSelectedTopic(topic);
    onRankingOpen();

    try {
      const response = await axiosInstance.get(
        `/game/rankings/${topic.topicId}`,
        {
          params: {
            pageNumber: 0, // 필요한 경우 페이지 번호를 변경하세요
            pageSize: 10, // 필요한 경우 페이지 크기를 변경하세요
          },
        },
      );
      setRankingData(response.data);
      const selectedBadge = earnedBadgeList.find(
        (badge) => badge.topicId === topic.topicId,
      );
      if (selectedBadge) {
        setTotalQuestionsCount(selectedBadge.totalQuestionsCount);
      }
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    }
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        cursor="pointer"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={badgeIcon} boxSize="30px" mr={2} />
        <Text>내가 모은 뱃지</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            <Grid
              templateColumns={`repeat(${Math.min(earnedBadgeList.length, 2)}, 1fr)`}
              gap={5}
              justifyContent="center"
            >
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
                        onClick={() =>
                          handleBadgeClick({
                            topicId: earnedBadge.topicId,
                            title: earnedBadge.title,
                            imgSrc,
                            name: earnedBadge.title,
                          })
                        }
                      >
                        {earnedBadge.title}
                      </Box>
                    );
                  })}
                </Flex>
              ) : (
                <Text>
                  아직 획득한 뱃지가 없어요. 게임을 통해 하트와 뱃지를
                  모아보세요!
                </Text>
              )}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <UserRank
        isOpen={isRankingOpen}
        onClose={onRankingClose}
        topicName={selectedTopic?.name || ''}
        topic={selectedTopic}
        currentUserNickname={userInfo.nickname}
        rankingData={rankingData}
        totalQuestionsCount={totalQuestionsCount}
      />
    </>
  );
}

export default UserBadge;
