import React from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
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

function UserLogout() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달의 초기 상태를 닫힌 상태로 설정
  return (
    <>
      <Flex onClick={onOpen} alignItems="center" justifyContent="center">
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
            <Button
              flex="1"
              variant="outline"
              // colorScheme="#FF711A"
              mr={3}
              onClick={onClose}
            >
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
