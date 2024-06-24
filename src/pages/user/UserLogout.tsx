import React from 'react';
import {
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

function UserLogout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex onClick={onOpen}>
        <Text>로그아웃</Text>
      </Flex>

      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" justifyContent="center">
              <Text>로그아웃 하시겠습니까?</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter justifyContent="center" w="100%">
            <Button flex="1" variant="outline" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button
              flex="1"
              // onClick={handleLogout} //[TODO] 로그아웃 로직 추가
            >
              로그아웃
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserLogout;
