import React from 'react';
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
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function UserAccountDelete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  //userController (delete) userlogout 시에만 RT삭제 .api 변경 탈퇴 시에도 RT삭제로 변경
  const handleDelete = () => {
    const refreshToken = Cookies.get('refreshToken');
    axiosInstance
      .delete('/user/logout', {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .then((response) => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        toast({
          description: '성공적으로 로그아웃 되었습니다',
          status: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('로그아웃에 실패했습니다.', error);
        toast({
          description: '로그아웃 도중 에러가 발생했습니다',
          status: 'error',
        });
      })
      .finally(() => {
        onClose();
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Flex onClick={onOpen}>
        <Text>회원탈퇴</Text>
      </Flex>
      <Modal size="2xl" isOpen={isOpen} onClose={handleCancel} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" justifyContent="center">
              <Text fontSize="3xl">회원탈퇴</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderRadius="lg" border="1px dotted gray">
              <Text textAlign="center" fontSize="2xl">
                획득한 뱃지와 하트 내역,
                <br />
                초성게임 사용 내역이 사라지며,
                <br />
                회원탈퇴 시{' '}
                <Text as="span" color="red.500">
                  복구가 어렵습니다.
                </Text>
              </Text>
              <Text color="red.300" textAlign="center" m={4} fontWeight="bold">
                정말 143 초성게임을 탈퇴하시겠습니까?
                <br />
                &apos;예&apos; 선택 시 회원탈퇴 후, 첫 화면으로 돌아갑니다.

              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center" w="100%">
            <Button flex="1" mr={3} onClick={handleDelete}>
              예
            </Button>
            <Button
              flex="1"
              variant="solid"
              colorScheme="orange"
              onClick={handleCancel}
            >
              아니요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserAccountDelete;
