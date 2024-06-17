import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

function UserAccountDelete() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Box>
        <Box p={5} borderRadius="lg" borderWidth="1px">
          <VStack align="stretch" spacing={4}>
            <Text
              cursor="pointer"
              textDecoration="underline"
              onClick={openModal}
            >
              개인정보 수집 및 이용 약관
            </Text>
          </VStack>

          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader border="1px solid black">
                143 초성 게임에서 회원탈퇴 하시겠습니까?
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mt={5} p={5} border="1px solid black" borderRadius="lg">
                  <Text textAlign="center" fontSize="1rem">
                    획득한 뱃지와 하트 내역, 초성게임 사용 내역이 사라지며,
                    <br />
                    회원탈퇴 시 복구가 어렵습니다.
                  </Text>
                  <Text textAlign="center" mt={4} fontWeight="bold">
                    정말 143 초성게임을 탈퇴하시겠습니까?
                  </Text>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={closeModal}>
                  예
                </Button>
                <Button variant="ghost" onClick={closeModal}>
                  아니요
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

export default UserAccountDelete;
