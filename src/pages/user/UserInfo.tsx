import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Heading,
  Image,
  Text,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState, fontSizeState } from '../../recoil/atoms';
import UserBadge from './UserBadge';
import UserAgreement from './UserAgreement';
import UserLogout from './UserLogout';
import badgeIcon from '../../asset/images/badge48.png';

const UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleChangeUserInfo() {
    navigate('/userInfo/update', { state: userInfo });
  }

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Center>
      <Card
        w="100%"
        maxW="3xl"
        bg={bgColor}
        p={6}
        borderRadius="lg"
        shadow="md"
      >
        <Box textAlign="center">
          <Heading size="xl" color={textColor}>
            회원 정보
          </Heading>
          <CardBody
            onClick={handleChangeUserInfo}
            cursor="pointer"
            _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
          >
            {userInfo.imageUrl ? (
              <Image
                src={userInfo.imageUrl}
                borderRadius="full"
                boxSize="150px"
                alt="Profile Image"
                m="auto"
                mb={3}
              />
            ) : (
              <Text>No image</Text>
            )}
            <Box textAlign="center" fontSize="xl" mt={3} color={textColor}>
              <Text>성별: {userInfo.gender}</Text>
              <Text>거주지: {userInfo.location}</Text>
              <Text>별명: {userInfo.nickname}</Text>
            </Box>
            <Text align="right" color="gray.500" fontSize="lg">
              정보 수정
            </Text>
          </CardBody>
          <Divider mb={3} />
          <Box>
            <Flex
              onClick={onOpen}
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              p={4}
              bg="gray.200"
              borderRadius="lg"
            >
              <Image src={badgeIcon} boxSize="50px" mr={4} />
              <Text color="black" fontSize="2xl" fontWeight="bold">
                내가 모은 뱃지
              </Text>
            </Flex>
            <UserBadge userInfo={userInfo} isOpen={isOpen} onClose={onClose} />
          </Box>
          <Divider mt={3} mb={3} />
          <Text fontSize="xl" mt={3} color={textColor}>
            게임 설정
          </Text>
          <Button w="100%" fontSize="lg" onClick={toggleColorMode} mt={3}>
            색상 모드 변경
          </Button>
          <Divider mt={3} mb={3} />
          <Stack
            direction="row"
            align="center"
            justify="center"
            spacing={4}
            mt={6}
            mb={3}
          >
            <UserAgreement />
          </Stack>
          <Center mt={5}>
            <UserLogout />
          </Center>
        </Box>
      </Card>
    </Center>
  );
};

export default UserInfo;
