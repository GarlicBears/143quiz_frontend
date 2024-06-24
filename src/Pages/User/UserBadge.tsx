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
import topicList from '../../Asset/topicList';
import badgeIcon from '../../Asset/images/badge48.png';
function UserBadge() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달의 초기 상태를 닫힌 상태로 설정

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
              {topicList.map((topic, index) => (
                <GridItem key={index} w="100%">
                  <Box
                    borderRadius="2xl"
                    border="1px solid orange"
                    overflow="hidden"
                    textAlign="center"
                    w="100%"
                    p={3}
                  >
                    <Box
                      border="1px solid orange"
                      borderRadius="full"
                      bg="orange.100"
                      boxSize="80px"
                      m="auto"
                    >
                      <Image
                        src={topic.imgSrc}
                        borderRadius="full"
                        boxSize="50px"
                        m="auto"
                        mt={4}
                      />
                    </Box>
                    <Text mt={2}>{topic.name}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserBadge;
