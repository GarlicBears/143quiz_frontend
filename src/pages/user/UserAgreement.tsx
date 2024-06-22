import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

// 회원 이용 약관 내용
function UserAgreement() {
  const [isChecked, setIsChecked] = useState(false);
  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
  } = useDisclosure();
  const {
    isOpen: isPrivacyOpen,
    onOpen: onPrivacyOpen,
    onClose: onPrivacyClose,
  } = useDisclosure();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleAllAgree = () => {
    setIsChecked(true);
  };

  return (
    <Box p={5} borderRadius="lg" borderWidth="1px">
      <Text fontWeight="bold">서비스 이용약관</Text>
      <br />
      <VStack align="stretch" spacing={4}>
        <Text onClick={onTermsOpen} cursor="pointer" textDecoration="underline">
          서비스 이용약관 동의(필수)
        </Text>
        <Text
          onClick={onPrivacyOpen}
          cursor="pointer"
          textDecoration="underline"
        >
          개인정보 수집 및 이용 동의 (필수)
        </Text>
      </VStack>
      <Modal isOpen={isTermsOpen} onClose={onTermsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={35} p={5} border="1px solid black">
              <Text>서비스 이용약관 내용</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isPrivacyOpen} onClose={onPrivacyClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={35} p={5} border="1px solid black">
              <Text>개인정보처리 방침</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <br />
      <Flex justifyContent="space-between">
        <Text>약관 동의 후 회원가입이 가능합니다.</Text>
        <Button variant="outline" onClick={handleAllAgree}>
          전체동의
        </Button>
      </Flex>
    </Box>
  );
}

export default UserAgreement;
