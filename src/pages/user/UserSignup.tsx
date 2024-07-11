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
  const [passwordError, setPasswordError] = useState('');

  const [nickName, setNickName] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [nickNameAvailable, setNickNameAvailable] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;

  const passwordRegex =
    /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])|(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])|(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%?&]))[A-Za-z\d@$!%?&]{8,}$/;

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

  const checkEmailExists = () => {
    const fullEmail = `${email}@${customDomain || domain}`;
    if (!emailRegex.test(fullEmail)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
      return;
    }
    axiosInstance
      .post('/user/checkEmail', { email: fullEmail })
      .then((response) => {
        if (response.data.exists) {
          setEmailAvailable(false);
          setEmailError('이미 사용 중인 이메일입니다.');
        } else {
          setEmailAvailable(true);
          setEmailError('');
          toast({
            title: '사용 가능한 이메일',
            description: '사용 가능한 이메일입니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
            containerStyle: {
              display: 'flex',
              justifyContent: 'center',
            },
          });
        }
      })
      .catch((error) => {
        toast({
          title: '오류발생',
          description: '사용 중인 이메일입니다. 다른 이메일을 사용해주세요',
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
  };

  const checkNicknameExists = () => {
    if (!nickNameRegex.test(nickName)) {
      setNickNameError('유효하지 않은 별명 형식입니다.');
      return;
    }
    axiosInstance
      .post('/user/checkNickname', { nickname: nickName })
      .then((response) => {
        if (response.data.exists) {
          setNickNameAvailable(false);
          setNickNameError('이미 사용 중인 별명입니다.');
        } else {
          setNickNameAvailable(true);
          setNickNameError('');
          toast({
            title: '사용 가능한 별명',
            description: '사용 가능한 별명입니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
            containerStyle: {
              display: 'flex',
              justifyContent: 'center',
            },
          });
        }
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
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setBirthYear(selectedYear);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (!passwordRegex.test(value)) {
      setPasswordError('올바르지 않은 비밀번호 형식입니다.');
    } else {
      setPasswordError('');
    }
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
          toast({
            title: '가입 성공',
            description:
              '회원가입이 성공적으로 완료되었습니다. 로그인을 이용해 주세요.',
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
                  </Select>
                )}
                <Button variant="outline" onClick={checkEmailExists}>
                  중복확인
                </Button>
              </Flex>
              {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
            </FormControl>
            <FormControl mb={5} isInvalid={!!passwordError}>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="최소 8자 이상, 영문 대문자, 소문자, 숫자, 특수문자를 사용해 주세요"
                  onChange={handlePasswordChange}
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
              {passwordError && (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              )}
              <FormControl mb={5} isInvalid={password !== passwordCheck}>
                <FormLabel>비밀번호 확인</FormLabel>
                <Input
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <FormErrorMessage>비밀번호가 다릅니다.</FormErrorMessage>
              </FormControl>
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>별명 입력</FormLabel>
              <Flex gap={2}>
                <Input
                  type="text"
                  value={nickName}
                  placeholder="3-20자 이내, 한글, 영어 대소문자, 숫자, 이모지 사용 가능합니다."
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
              {nickNameError && (
                <FormErrorMessage>{nickNameError}</FormErrorMessage>
              )}
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
            <FormControl mb={5}>
              <FormLabel>출생연도</FormLabel>
              <Select
                placeholder="출생연도 선택"
                value={birthYear}
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
