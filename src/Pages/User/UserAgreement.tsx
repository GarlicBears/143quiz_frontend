import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

// 회원 이용 약관 내용
function UserAgreement() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleAllAgree = () => {
    setIsChecked(true);
  };
  // const handleCheckboxChange = (e) => setIsChecked(e.target.checked);
  return (
    <Box p={5} borderRadius="lg">
      <Flex justifyContent="space-between">
        <Text>서비스 이용약관</Text>
        <Button justifyContent="flex-end" onClick={handleAllAgree}>
          전체동의
        </Button>
      </Flex>
      <VStack align="stretch" spacing={4}>
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
          서비스 이용약관 동의(필수)
        </Checkbox>
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
          개인정보 수집 및 이용 동의 (필수)
        </Checkbox>
      </VStack>
    </Box>
  );
}

export default UserAgreement;
