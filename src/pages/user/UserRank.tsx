import React, { useState } from 'react';
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
  useDisclosure,
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
};

const dummyRankingData = [
  { rank: 1, nickname: 'User1', hearts: 100 },
  { rank: 2, nickname: 'User2', hearts: 90 },
  { rank: 3, nickname: 'User3', hearts: 80 },
];
function UserRank({ isOpen, onClose, topicName }: UserRankProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {/*<Flex>*/}
            {/*  <Text>{selectedTopic?.name} 게임 랭킹</Text>*/}
            {/*</Flex>*/}
            <Flex alignItems="center" justifyContent="center">
              {Topic && (
                <>
                  {/*<Image src={Topic.imgSrc} boxSize="30px" mr={2} />*/}
                  <Text>{Topic.name} 게임 랭킹</Text>
                </>
              )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody border="1px solid" borderRadius="full">
            {/*<Flex alignItems="center" justifyContent="center">*/}
            {/*  <Box>순위</Box>*/}
            {/*  <Box>닉네임</Box>*/}
            {/*  <Box>하트 수</Box>*/}
            {/*</Flex>*/}
            <Box border="1px solid" borderRadius="md" p={4}>
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
