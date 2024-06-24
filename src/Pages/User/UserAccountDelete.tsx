// import React from 'react';
// import {
//   Box,
//   Button,
//   Flex,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Text,
//   useDisclosure,
// } from '@chakra-ui/react';
//
// function UserAccountDelete() {
//   const { isOpen, onOpen, onClose } = useDisclosure(); // 모달의 초기 상태를 닫힌 상태로 설정
//   return (
//     <>
//       <Flex onClick={onOpen}>
//         <Text>회원탈퇴</Text>
//       </Flex>
//       <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             <Flex alignItems="center" justifyContent="center">
//               <Text>회원탈퇴하시겠습니까?</Text>
//             </Flex>
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Box mt={5} p={5} border="1px solid black" borderRadius="lg">
//               <Text textAlign="center" fontSize="1rem">
//                 획득한 뱃지와 하트 내역, 초성게임 사용 내역이 사라지며,
//                 <br />
//                 회원탈퇴 시 복구가 어렵습니다.
//               </Text>
//               <Text textAlign="center" mt={4} fontWeight="bold">
//                 정말 143 초성게임을 탈퇴하시겠습니까?
//               </Text>
//             </Box>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="red" mr={3} onClick={onClose}>
//               예
//             </Button>
//             <Button variant="ghost" onClick={onClose}>
//               아니요
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
//
// export default UserAccountDelete;
import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

function UserAccountDelete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showConfirm, setShowConfirm] = useState(true);

  const handleDelete = () => {
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(true);
    onClose();
  };

  return (
    <>
      <Flex onClick={onOpen}>
        <Text>회원탈퇴</Text>
      </Flex>
      <Modal size="xl" isOpen={isOpen} onClose={handleCancel} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" justifyContent="center">
              <Text>회원탈퇴하시겠습니까?</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          {showConfirm ? (
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
          ) : (
            <ModalBody>
              <VStack spacing={4}>
                <Input placeholder="가입한 이메일 주소를 입력하세요" />
                <Input placeholder="비밀번호" type="password" />
              </VStack>
            </ModalBody>
          )}
          <ModalFooter justifyContent="center" w="100%">
            {showConfirm ? (
              <Button flex="1" mr={3} onClick={handleDelete}>
                예
              </Button>
            ) : (
              <Button flex="1" mr={3} onClick={handleCancel}>
                탈퇴 처리
              </Button>
            )}
            <Button flex="1" variant="ghost" onClick={handleCancel}>
              아니요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserAccountDelete;
