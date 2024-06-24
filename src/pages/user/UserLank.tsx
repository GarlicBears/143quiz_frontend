import React from 'react';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
//회원 랭킹 조회 화면
function UserLank() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex onClick={onOpen}>
        <Text>랭킹</Text>
      </Flex>

      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" justifyContent="center">
              <Box>순위</Box>
              <Box>닉네임</Box>
              <Box>하트 수</Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
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

export default UserLank;
