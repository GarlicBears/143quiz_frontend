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
import CustomButton from '../Components/Common/CustomButton';

function MainPage() {
  return (
    <>
      <Center>
        <Card w="100%">
          <CardHeader textAlign="center">
            <Heading>143 초성게임</Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center">
              주제를 고른 후, <br />
              주어진 자음에 맞는 단어를 맟줘보세요
            </Text>
            <Box mt={5} border="1px solid black" w="100%" h="300px">
              게임 간략 소개 gif
            </Box>
          </CardBody>
          <CardFooter justifyContent="center">
            <CustomButton />
          </CardFooter>
        </Card>
      </Center>
    </>
  );
}

export default MainPage;
