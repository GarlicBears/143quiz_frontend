import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
} from '@chakra-ui/react';

type Topic = {
  name: string;
  imgSrc: string;
};

type UserRankProps = {
  isOpen: boolean;
  onClose: () => void;
  topicName: string | null;
  topic: Topic | null;
  currentUserNickname: string;
  rankingData: {
    userId: number;
    nickname: string;
    totalBadges: number;
    totalHearts: number;
    rank: number;
  }[];
  totalQuestionsCount: number; // totalQuestionsCount 추가
};

function UserRank({
  isOpen,
  onClose,
  topic,
  topicName,
  currentUserNickname,
  rankingData,
  totalQuestionsCount,
}: UserRankProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(topic);
  const [filteredRankingData, setFilteredRankingData] = useState(rankingData);

  useEffect(() => {
    setSelectedTopic(topic);
  }, [topic]);

  useEffect(() => {
    const filteredData = rankingData.filter(
      (user) =>
        user.nickname !== currentUserNickname &&
        user.totalHearts !== totalQuestionsCount,
    );
    setFilteredRankingData(filteredData);
  }, [rankingData, currentUserNickname, totalQuestionsCount]);

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box alignItems="center" justifyContent="center">
              {selectedTopic ? (
                <>
                  <Text textAlign="center">{topicName || ''} 게임 랭킹</Text>
                  <Box
                    overflow="hidden"
                    textAlign="center"
                    w="100%"
                    p={3}
                    mt={3}
                  >
                    <Box
                      border="3px solid orange"
                      borderRadius="full"
                      bg="orange.100"
                      boxSize="30%"
                      m="auto"
                    >
                      <Image
                        src={selectedTopic.imgSrc}
                        alt={topicName || ''}
                        borderRadius="full"
                        boxSize="70%"
                        m="auto"
                        mt={4}
                      />
                    </Box>
                  </Box>
                </>
              ) : (
                <Text>주제가 선택되지 않았습니다</Text>
              )}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box border="1px solid orange" borderRadius="md" p={4}>
              <Flex justifyContent="space-around">
                <Text>순위</Text>
                <Text>닉네임</Text>
                <Text>하트 수</Text>
              </Flex>
              {filteredRankingData.map((user, index) => (
                <Flex justifyContent="space-around" mt={2} key={user.userId}>
                  <Text>{index + 1}</Text>
                  <Text>{user.nickname}</Text>
                  <Text>{user.totalHearts}</Text>
                </Flex>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserRank;
