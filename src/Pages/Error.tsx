import React from 'react';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import errorImage from '../Asset/images/error.png';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginTop="140px"
      >
        <Box
          bg="orange"
          borderRadius="full"
          boxSize="160px"
          bgImage={errorImage}
          bgPosition="center"
          bgRepeat="no-repeat"
        />
        <Text fontSize="2xl" marginY={4}>
          404 에러
        </Text>
        <Text color="gray" mb={4}>
          페이지를 찾지 못했습니다.
        </Text>
        <Link to="/">
          <Button colorScheme="customOrange" variant="outline" mb={3}>
            홈으로 돌아가기
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default Error;
