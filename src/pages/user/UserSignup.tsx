import React, { useState } from 'react';
import {
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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneLines,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import UserAgreement from './UserAgreement';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

//회원 가입 화면

function UserSignup() {
  const [email, setEmail] = useState('');
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [emailError, setEmailError] = useState('');

  const toast = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [nickName, setNickName] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [nickNameAvailable, setNickNameAvailable] = useState(false);

  // 이메일 비밀번호, 비번확인, 별명, 별명확인, 성별, 거주지, 출생연도 (1940-2022)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[a-z\d@$!%*?&]{8,}$/;
  const nickNameRegex =
    /^(?!.*\s)[a-zA-Z0-9가-힣\uD83C-\uDBFF\uDC00-\uDFFF]{3,20}$/u;

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  let submitAvailable =
    emailAvailable &&
    password &&
    password === passwordCheck &&
    gender &&
    birthYear &&
    location;

  if (!emailAvailable) {
    submitAvailable = false;
  }
  const handleDomainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'custom') {
      setDomain('custom');
      setCustomDomain('');
    } else {
      setDomain(value);
      setCustomDomain(value);
    }
  };
  const handleCustomDomainClear = () => {
    setDomain('');
    setCustomDomain('');
  };

  function checkEmailExists() {
    const fullEmail = `${email}@${customDomain || domain}`;
    if (!emailRegex.test(fullEmail)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
      return;
    }
    axiosInstance
      .post('/user/checkEmail', { email: fullEmail })
      .then((response) => {
        setEmailAvailable(!response.data.exists);
        toast({
          title: response.data.exists ? '중복된 이메일' : '사용 가능한 이메일',
          description: response.data.exists
            ? '이미 사용 중인 이메일입니다.'
            : '사용 가능한 이메일입니다.',
          status: response.data.exists ? 'error' : 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            display: 'flex',
            justifyContent: 'center',
          },
        });
      })
      .catch((error) => {
        toast({
          title: '오류발생',
          description:
            '이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            display: 'flex',
            justifyContent: 'center',
          },
        });
      });
  }

  function checkNicknameExists() {
    if (!nickNameRegex.test(nickName)) {
      setNickNameError('유효하지 않은 별명 형식입니다.');
      return;
    }
    axiosInstance
      .post('/user/checkNickname', { nickname: nickName })
      .then((response) => {
        toast({
          title: response.data.exists ? '중복된 별명' : '사용 가능한 별명',
          description: response.data.exists
            ? '이미 사용 중인 별명입니다.'
            : '사용 가능한 별명입니다.',
          status: response.data.exists ? 'error' : 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            display: 'flex',
            justifyContent: 'center',
          },
        });
      })
      .catch((error) => {
        toast({
          title: '오류발생',
          description: '별명 확인 중 오류가 발생했습니다. 다시 시도해 주세요.',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            display: 'flex',
            justifyContent: 'center',
          },
        });
        console.error('Request failed:', error.response || error);
      });
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setBirthYear(selectedYear);
  };

  const handleSubmit = () => {
    const fullEmail = `${email}@${customDomain || domain}`;
    if (submitAvailable) {
      axiosInstance
        .post('/user/signup', {
          email: fullEmail,
          password: password,
          nickname: nickName,
          gender: gender,
          birthYear: birthYear,
          location: location,
        })
        .then((response) => {
          // 성공적으로 저장되었을 때의 처리
          toast({
            title: '가입 성공',
            description:
              '회원가입이 성공적으로 완료되었습니다.로그인을 이용해 주세요',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
            containerStyle: {
              display: 'flex',
              justifyContent: 'center',
            },
          });
          navigate('/');
        })
        .catch((error) => {
          // 오류 발생시 처리
          toast({
            title: '가입 실패',
            description: '오류가 발생했습니다. 다시 시도해 주세요.',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top',
            containerStyle: {
              display: 'flex',
              justifyContent: 'center',
            },
          });
        });
    } else {
      toast({
        title: '오류',
        description: '입력한 정보를 다시 확인해주세요.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center>
        <Card w="100%">
          <CardHeader>
            <Heading>○ 회원가입</Heading>
          </CardHeader>
          <CardBody>
            <FormControl mb={5}>
              <FormLabel>이메일</FormLabel>
              <Flex gap={2}>
                <Input
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailAvailable(false); // 이메일을 변경할 때마다 emailAvailable을 false로 설정
                  }}
                  mr={2}
                  w={40}
                />
                @
                {domain === 'custom' ? (
                  <InputGroup w={40}>
                    <Input
                      placeholder="직접입력"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                    />
                    <InputRightElement>
                      <Button size="sm" onClick={handleCustomDomainClear}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                ) : (
                  <Select
                    w={40}
                    value={domain}
                    onChange={handleDomainChange}
                    placeholder="도메인 선택"
                  >
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="custom">직접 입력</option>
                  </Select>
                )}
                <Button variant="outline" onClick={checkEmailExists}>
                  중복확인
                </Button>
              </Flex>
              <FormErrorMessage>이메일 중복체크를 해주세요.</FormErrorMessage>
            </FormControl>
            <FormControl mb={5}>
              {/*<FormControl mb={5} isInvalid={password.length === 0}>*/}
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="최소 8자 이상, 소문자, 숫자, 특수문자를 사용해 주세요"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleTogglePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <FormControl mb={5} isInvalid={password != passwordCheck}>
                <FormLabel>비밀번호 확인</FormLabel>
                <Input
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </FormControl>
              <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>별명 입력</FormLabel>
              <Flex gap={2}>
                <Input
                  type="text"
                  value={nickName}
                  placeholder="3-20자 이내, 한글,영어대소문자,숫자,이모지 사용가능합니다."
                  onChange={(e) => setNickName(e.target.value)}
                ></Input>
                <Button size="md" borderRadius="full">
                  <FontAwesomeIcon
                    icon={faMicrophoneLines}
                    style={{ color: '#ff711a' }}
                  />
                </Button>
                <Button variant="outline" onClick={checkNicknameExists}>
                  중복확인
                </Button>
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
            <FormControl mb={5}>
              <FormLabel>거주지</FormLabel>
              <Select
                placeholder={'거주 지역 선택'}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Seoul">서울</option>
                <option value="Gyeonggi">경기</option>
                <option value="Incheon">인천</option>
                <option value="Gangwon">강원</option>
                <option value="Chungcheong">충청</option>
                <option value="Gyeongsang">경상</option>
                <option value="Jeolla">전라</option>
                <option value="Jeju">제주</option>
                <option value="Overseas">해외</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>이용약관</FormLabel>
              <UserAgreement />
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              w="100%"
              colorScheme={submitAvailable ? 'orange' : 'gray'}
              isDisabled={!submitAvailable}
              onClick={handleSubmit}
            >
              가입하기
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </>
  );
}

export default UserSignup;
