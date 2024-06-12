import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Img,
  Text,
} from '@chakra-ui/react';
import CustomButton from '../Components/Common/CustomButton';

const photos = [
  'https://via.placeholder.com/600x400?text=Photo+1',
  'https://via.placeholder.com/600x400?text=Photo+2',
  'https://via.placeholder.com/600x400?text=Photo+3',
  'https://via.placeholder.com/600x400?text=Photo+4',
];

function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePreClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
    );
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
    );
  };
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
            <Box
              gap={2}
              display="flex"
              mt={5}
              border="0px solid black"
              w="100%"
              justifyContent="center"
            >
              <Button alignSelf="center" onClick={handlePreClick}>
                이전
              </Button>
              <Img
                src={photos[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
              />
              <Button alignSelf="center" onClick={handleNextClick}>
                다음
              </Button>
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
