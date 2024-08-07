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
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserContext } from './UserProvider';

function UserLogout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();
  const { clearUserInfo } = useUserContext();

  const handleLogout = () => {
    axiosInstance
      .delete('/user/logout', {})
      .then(() => {
        Cookies.remove('accessToken');
        clearUserInfo();
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

  return (
    <>
      <Flex
        _hover={{ color: 'orange.500', cursor: 'pointer' }}
        onClick={onOpen}
      >
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
              variant="solid"
              colorScheme="orange"
              mr={3}
              onClick={onClose}
            >
              취소
            </Button>
            <Button flex="1" onClick={handleLogout}>
              로그아웃
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserLogout;
