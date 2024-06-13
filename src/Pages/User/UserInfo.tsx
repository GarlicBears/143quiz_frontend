import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';

function UserInfo() {
  return (
    <>
      <Center>
        <Card w="100%">
          <CardHeader textAlign="center">
            <Heading>143 초성게임</Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center" fontSize="xl"></Text>
            <Box
              gap={2}
              display="flex"
              mt={5}
              border="0px solid black"
              w="100%"
              justifyContent="center"
            ></Box>
          </CardBody>
          <CardFooter justifyContent="center"></CardFooter>
        </Card>
      </Center>
    </>
  );
}

export default UserInfo;
