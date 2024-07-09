import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAgreement from './UserAgreement';
import UserAccountDelete from './UserAccountDelete';
import UserLogout from './UserLogout';
import axiosInstance from '../../api/axiosInstance';

const genderMap: { [key: string]: string } = {
  남자: 'male',
  여자: 'female',
  기타: 'other',
};

const locationMap: { [key: string]: string } = {
  서울: 'Seoul',
  경기: 'Gyeonggi',
  강원: 'Gangwon',
  전라: 'Jeolla',
  충청: 'Chungcheong',
  경상: 'Gyeongsang',
  제주: 'Jeju',
  해외: 'Overseas',
};

interface UserInfo {
  nickname: string;
  gender: string;
  location: string;
  imageUrl: string;
  birthYear: number;
}

function UserInfoUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state as UserInfo;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const [birthYear, setBirthYear] = useState<number | null>(userInfo.birthYear);
  const [gender, setGender] = useState<string>(userInfo.gender);
  const [locationState, setLocation] = useState<string>(userInfo.location);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updatedUserInfo, setUpdatedUserInfo] = useState<UserInfo>(userInfo);
  // 확인용 로그
  console.log('Initial birthYear:', birthYear);
  console.log('Initial gender:', gender);
  console.log('Initial location:', locationState);
  console.log('Initial selectedFile:', selectedFile);
  console.log('Initial updatedUserInfo:', updatedUserInfo);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    axiosInstance
      .patch('/user/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert('이미지가 성공적으로 업로드되었습니다.');
          // 서버에서 받은 이미지 URL을 업데이트
          setUpdatedUserInfo((prevInfo) => ({
            ...prevInfo,
            imageUrl: response.data.imageUrl,
          }));
        } else {
          alert('이미지 업로드에 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.error('Failed to upload image', error);
        alert('이미지 크기 2MB 이하로 업로드 해주세요.');
      });
  };

  const handleSaveChanges = () => {
    if (!birthYear || !gender || !locationState) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    const updateUserDto = {
      birthYear,
      gender: genderMap[gender] as string,
      location: locationMap[locationState] as string,
    };
    axiosInstance
      .patch('/user/', updateUserDto)
      .then((response) => {
        if (response.status === 200) {
          alert('회원정보가 성공적으로 수정되었습니다.');
          navigate('/userInfo');
        } else {
          alert('회원정보 수정에 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.error('Failed to update user information', error);
        alert('회원정보 수정 중 오류가 발생하였습니다.');
      });
  };

  const generateYearOption = () => {
    const startYear = 1940;
    const endYear = 2022;
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i,
    );
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  return (
    <Center>
      <VStack
        border="0px solid black"
        w="100%"
        p={2}
        spacing={3}
        align="stretch"
      >
        <Box textAlign="center">
          <Text border="0px solid black" textAlign="center">
            회원정보 수정
          </Text>
          <Image
            src={updatedUserInfo.imageUrl}
            // border="1px solid black"
            borderRadius="full"
            boxSize="150px"
            margin="auto"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Button
            variant="ghost"
            textDecoration="underline"
            mt={4}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            이미지 업로드
          </Button>
          <Button variant="solid" mt={4} onClick={handleFileUpload}>
            업로드
          </Button>
          <Text>내가 모은 뱃지로 프로필 설정하기</Text>
        </Box>
        <Divider />
        <Box>
          <FormControl>
            <FormLabel>출생연도 변경</FormLabel>
            <Select
              value={userInfo.birthYear !== null ? userInfo.birthYear : ''}
              onChange={(e) => setBirthYear(Number(e.target.value))}
            >
              {generateYearOption()}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>성별 변경</FormLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="남자">남자</option>
              <option value="여자">여자</option>
              <option value="기타">기타</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>거주지 변경</FormLabel>
            <Select
              value={locationState}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="강원">강원</option>
              <option value="전라">전라</option>
              <option value="충청">충청</option>
              <option value="경상">경상</option>
              <option value="제주">제주</option>
              <option value="해외">해외</option>
            </Select>
          </FormControl>
          <Button mt="20px" w="100%" onClick={handleSaveChanges}>
            변경 사항 저장
          </Button>
        </Box>
        <Divider />
        <UserAgreement />
        <Divider />
        <UserLogout />
        <Divider />
        <UserAccountDelete />
        <Divider />
      </VStack>
    </Center>
  );
}

export default UserInfoUpdate;
