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
import main1 from '../asset/main01.png';
import main2 from '../asset/main002.png';
import main4 from '../asset/main04.png';
import main5 from '../asset/main05.png';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/common/CustomButton';
// 회원가입 >> 로그인 >> 메인 화면 : 게임설명 화면
const photos = [
  {
    src: main1,
    text: '여러 주제 중 하나를 선택합니다.',
  },
  {
    src: main2,
    text: 'This is the second photo',
  },
  {
    src: main4,
    text: 'This is the third photo',
  },
  {
    src: main5,
    text: 'This is the fourth photo',
  },
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
        <Card w="100%" border="1px solid orange">
          <CardHeader textAlign="center">
            <Heading>143 초성게임</Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center" fontSize="2xl">
              주제를 고른 후, <br />
              주어진 초성에 맞는 단어를 맞춰보세요
            </Text>
            <Box
              border="1px solid orange"
              borderRadius="xl"
              // display="flex"
              justifyContent="center"
              //              position="relative"
            >
              <Button
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                variant="line"
                onClick={handlePreClick}
              >
                <FontAwesomeIcon
                  icon={faCaretUp}
                  rotation={270}
                  size="5x"
                  style={{ color: '#FF711A' }}
                />
              </Button>
              <Box w="100%" position="relative">
                <Img
                  src={photos[currentIndex].src}
                  alt={`Photo ${currentIndex + 1}`}
                  w="100%"
                  objectFit="cover"
                  borderRadius="xl"
                />
                <Text
                  position="absolute"
                  bottom="0"
                  left="0"
                  width="100%"
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  textAlign="center"
                  fontSize="1.3rem"
                  borderRadius="xl"
                  p={3}
                >
                  {photos[currentIndex].text}
                </Text>
              </Box>
              <Button
                position="absolute"
                right="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                variant="line"
                onClick={handleNextClick}
              >
                <FontAwesomeIcon
                  icon={faCaretUp}
                  rotation={90}
                  size="5x"
                  style={{ color: '#FF711A' }}
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
