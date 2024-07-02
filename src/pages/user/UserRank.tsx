import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
} from '@chakra-ui/react';
import Topic from '../game/Topic';
//회원 랭킹 조회 화면

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
};
// [TODO]: 게임 유저 외  다른 유저의 정보 가져와서 순위 조회
const dummyRankingData = [
  { rank: 1, nickname: 'User1', hearts: 100 },
  { rank: 2, nickname: 'User2', hearts: 90 },
  { rank: 3, nickname: 'User3', hearts: 80 },
];

function UserRank({
  isOpen,
  onClose,
  topic,
  currentUserNickname,
}: UserRankProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(topic);
  const [filteredRankingData, setFilteredRankingData] =
    useState(dummyRankingData);
  useEffect(() => {
    setSelectedTopic(topic);
  }, [topic]);

  useEffect(() => {
    // 현재 유저를 제외한 랭킹 데이터를 필터링
    const filteredData = dummyRankingData.filter(
      (user) => user.nickname !== currentUserNickname,
    );
    setFilteredRankingData(filteredData);
  }, [currentUserNickname]);

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box alignItems="center" justifyContent="center">
              {selectedTopic ? (
                <>
                  <Text textAlign="center">{selectedTopic.name} 게임 랭킹</Text>
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
                      boxSize="30%" // 랭킹 주제 뱃지 크기 설정
                      m="auto"
                    >
                      <Image
                        src={selectedTopic.imgSrc}
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
              {dummyRankingData.map((user) => (
                <Flex justifyContent="space-around" mt={2} key={user.rank}>
                  <Text>{user.rank}</Text>
                  <Text>{user.nickname}</Text>
                  <Text>{user.hearts}</Text>
                </Flex>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center" w="100%">
            <Button flex="1" variant="outline" mr={3} onClick={onClose}>
              남은 하트 채우러 가기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserRank;
