import React from 'react';
import {
  Text,
  Image,
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from '@chakra-ui/react';

interface TopicType {
  topicId: number;
  title: string;
  heartsCount: number;
  totalQuestionsCount: number;
  topicImage: string;
}

type UserRankProps = {
  isOpen: boolean;
  onClose: () => void;
  topicName: string | null;
  topic: TopicType | null;
  currentUserNickname: string;
  rankingData: {
    userId: number;
    nickname: string;
    totalHearts: number;
  }[];
};

const UserRank: React.FC<UserRankProps> = ({
  isOpen,
  onClose,
  topicName,
  topic,
  currentUserNickname,
  rankingData,
}) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box alignItems="center" justifyContent="center">
            {topic ? (
              <>
                <Text textAlign="center">{topicName || ''} 게임 랭킹</Text>
                <Box overflow="hidden" textAlign="center" w="100%" p={3} mt={3}>
                  <Box
                    border="3px solid orange"
                    borderRadius="full"
                    bg="orange.100"
                    boxSize="30%"
                    m="auto"
                  >
                    <Image
                      src={topic.topicImage}
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
            {rankingData.map((user, index) => (
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
  );
};

export default UserRank;
