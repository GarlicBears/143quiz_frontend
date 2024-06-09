import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import UserAgreement from './UserAgreement';

//회원 가입 화면

function UserSignup() {
  const [email, setEmail] = useState('');
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [nickName, setNickName] = useState('');
  const [nickNameAvailable, setNickNameAvailable] = useState(false);

  const [gender, setGender] = useState('');
  const [location, setLocation] = useState();
  const [birthYear, setBirthYear] = useState('');
  // 이메일 비밀번호, 비번확인, 별명, 별명확인, 성별, 거주지, 출생연도 (1940-2022)

  let submitAvailable = true;

  if (!emailAvailable) {
    submitAvailable = false;
  }
  // 논의 : 이메일 확인
  const handleDomainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setDomain(value);
      if (value === 'custom') {
        setCustomDomain('');
      } else {
        setCustomDomain(value);
      }
    },
    handleSubmit = () => {
      const fullEmail = `${email}@${customDomain}`;
      toast({
        title: '이메일 확인',
        description: `입력한 이메일 주소는 ${fullEmail} 입니다.`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    },
    handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedYear = event.target.value;
      setBirthYear(selectedYear);
    };

  return (
    <>
      <Center>
        <Box>
          <Card>
            <CardHeader>
              <Heading>○ 회원가입</Heading>
            </CardHeader>
            <CardBody>
              <FormControl mb={5}>
                {/*<FormControl mb={5} isInvalid={!EmailAvailable}>*/}
                <FormLabel>이메일</FormLabel>
                <Flex>
                  <Input
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    mr={2}
                  />
                  @
                  <Select
                    value={domain}
                    onChange={handleDomainChange}
                    placeholder="도메인 선택"
                  >
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="custom">직접 입력</option>
                  </Select>
                  {domain === 'custom' && (
                    <Input
                      placeholder="직접 입력"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                    />
                  )}
                </Flex>
                <FormErrorMessage>이메일 중복체크를 해주세요.</FormErrorMessage>
              </FormControl>
              <FormControl mb={5}>
                {/*<FormControl mb={5} isInvalid={password.length === 0}>*/}
                <FormLabel>비밀번호</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>암호를 입력해 주세요.</FormErrorMessage>
              </FormControl>
              <FormControl mb={5} isInvalid={password != passwordCheck}>
                <FormLabel>비밀번호 확인</FormLabel>
                <Input
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!nickNameAvailable}>
                <FormLabel>별명 입력</FormLabel>
                <Flex gap={2}>
                  <Input
                    type="text"
                    value={nickName}
                    onChange={(e) => {
                      setNickName(e.target.value);
                      setNickNameAvailable(false);
                    }}
                  ></Input>
                  <Button
                    size="md"
                    colorScheme="beige"
                    border="1px solid tomato"
                    borderRadius="full"
                  >
                    <FontAwesomeIcon
                      icon={faMicrophoneLines}
                      style={{ color: '#ff711a' }}
                    />
                  </Button>
                  <Button>중복확인</Button>
                  {/*<Button onClick={handleNickNameCheck}>중복확인</Button>*/}
                </Flex>
                <FormErrorMessage>별명 중복 확인을 해주세요.</FormErrorMessage>
              </FormControl>
              <FormControl mb={5}>
                <FormLabel>성별</FormLabel>
                <Select
                  placeholder="성별 선택"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">남자</option>
                  <option value="female">여자</option>
                  <option value="other">기타</option>
                </Select>
              </FormControl>
              {/*출생연도 입력 1940_2022까지*/}
              <FormControl mb={5}>
                <FormLabel>출생연도</FormLabel>
                <Select
                  placeholder="출생연도 선택"
                  value={birthYear}
                  // onChange={(e = setGender(e.target.value))}
                  onChange={handleYearChange}
                >
                  {Array.from(
                    { length: 2022 - 1940 + 1 },
                    (_, index) => 1940 + index,
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {/*  -------거주지 입력---------*/}
              <FormControl>
                <FormLabel>거주지</FormLabel>
                <Select
                  placeholder={'거주 지역 선택'}
                  // onChange={(e) => setLocation(e.target.value)}
                >
                  {[
                    '서울',
                    '경기',
                    '강원',
                    '충청',
                    '경상',
                    '전라',
                    '제주',
                    '해외',
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {/* 회원가입하기 버튼*/}
              <Button isDisabled={!submitAvailable} onClick={handleSubmit}>
                가입하기
              </Button>
            </CardBody>
            {/*회원 이용약관 */}
            <CardFooter>
              <UserAgreement />
            </CardFooter>
          </Card>
        </Box>
      </Center>
    </>
  );
}

export default UserSignup;
