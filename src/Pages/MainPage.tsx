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
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
// 회원가입 >> 로그인 >> 메인 화면 : 게임설명 화면
const photos = [
  'https://via.placeholder.com/600x400?text=Photo+1',
  'https://via.placeholder.com/600x400?text=Photo+2',
  'https://via.placeholder.com/600x400?text=Photo+3',
  'https://via.placeholder.com/600x400?text=Photo+4',
];

function MainPage() {
  const navigate = useNavigate();
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
            <Text textAlign="center" fontSize="xl">
              주제를 고른 후, <br />
              주어진 자음에 맞는 단어를 맞춰보세요
            </Text>
            <Box
              gap={2}
              display="flex"
              mt={5}
              border="0px solid black"
              w="100%"
              justifyContent="center"
            >
              <Button
                variant="ghost"
                alignSelf="center"
                onClick={handlePreClick}
              >
                <FontAwesomeIcon
                  icon={faAngleUp}
                  rotation={270}
                  size="xl"
                  style={{ color: '#ef720b' }}
                />
              </Button>
              <Img
                src={photos[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
              />
              <Button
                variant="ghost"
                alignSelf="center"
                onClick={handleNextClick}
              >
                <FontAwesomeIcon
                  icon={faAngleUp}
                  rotation={90}
                  size="xl"
                  style={{ color: '#ef720b' }}
                />
              </Button>
            </Box>
          </CardBody>
          <CardFooter justifyContent="center">
            <CustomButton onClick={() => navigate('/topic')} />
          </CardFooter>
        </Card>
      </Center>
    </>
  );
}

export default MainPage;
