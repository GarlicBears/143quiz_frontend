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
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms';
import UserBadge from './UserBadge';
import UserAgreement from './UserAgreement';
import UserLogout from './UserLogout';
import badgeIcon from '../../asset/images/badge48.png';

const UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
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
            <Flex direction="column" alignItems="center">
              {userInfo.imageUrl ? (
                <Image
                  src={userInfo.imageUrl}
                  borderRadius="full"
                  boxSize="150px"
                  alt="Profile Image"
                  mb={3}
                />
              ) : (
                <Text>No image</Text>
              )}
              <Box textAlign="center" fontSize="xl" color={textColor} mb={3}>
                <Flex justifyContent="center" mb={1}>
                  <Box textAlign="right" mr={2}>
                    <Text>별명:</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text>{userInfo.nickname}</Text>
                  </Box>
                </Flex>
                <Flex justifyContent="center" mb={1}>
                  <Box textAlign="right" mr={2}>
                    <Text>출생연도:</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text>{userInfo.birthYear}년</Text>
                  </Box>
                </Flex>
                <Flex justifyContent="center" mb={1}>
                  <Box textAlign="right" mr={2}>
                    <Text>성별:</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text>{userInfo.gender}</Text>
                  </Box>
                </Flex>
                <Flex justifyContent="center" mb={1}>
                  <Box textAlign="right" mr={2}>
                    <Text>거주지:</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text>{userInfo.location}</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Text align="right" color="gray.500" fontSize="lg" mt={2} mr={2}>
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
              p={1}
              bg="gray.100"
              borderRadius="lg"
              _hover={{ bg: 'gray.200' }}
            >
              <Image src={badgeIcon} boxSize="36px" />
              <Text color="black" fontSize="xl" fontWeight="bold">
                내가 모은 뱃지
              </Text>
            </Flex>
            <UserBadge userInfo={userInfo} isOpen={isOpen} onClose={onClose} />
          </Box>
          <Divider mt={3} mb={3} />
          <Button w="100%" fontSize="xl" onClick={toggleColorMode} mt={3} p={4}>
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
