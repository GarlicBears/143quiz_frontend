import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

// Suspense fallback 컴포넌트로 불러와서 사용하기
// 예시 :
// <Suspense fallback={<LoadingSpinner />}>
//   <FirstLazyComponent />
// </Suspense>

const LoadingSpinner = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      align="center"
      justify="center"
      bg="rgba(255, 255, 255, 0.8)"
      zIndex="9999"
    >
      <Spinner
        thickness="4px"
        speed="0.7s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingSpinner;
