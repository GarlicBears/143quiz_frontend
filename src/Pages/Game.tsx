import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import blackboard from '../Asset/images/blackboard.png';
import Chance from '../Components/Game/Chance';
import Pass from '../Components/Game/Pass';
import AnswerSpeak from '../Components/Game/AnswerSpeak';
import AnswerWrite from '../Components/Game/AnswerWrite';
import Correct from '../Components/Game/Correct';
import Incorrect from '../Components/Game/Incorrect';
import Timeout from '../Components/Game/Timeout';
import { answerSubmitCountState } from '../Recoil/atom';

const Game = () => {
  const [seconds, setSeconds] = useState(30); // 타이머 상태
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('ㄱㄸㅂㄹ');
  const [answerSubmitCount, setAnswerSubmitCount] = useRecoilState(
    answerSubmitCountState,
  );
  const topic = '동물';

  const {
    isOpen: isCorrectOpen,
    onOpen: onCorrectOpen,
    onClose: onCorrectClose,
  } = useDisclosure();
  const {
    isOpen: isIncorrectOpen,
    onOpen: onIncorrectOpen,
    onClose: onIncorrectClose,
  } = useDisclosure();
  const {
    isOpen: isTimeoutOpen,
    onOpen: onTimeoutOpen,
    onClose: onTimeoutClose,
  } = useDisclosure();

  const data = [
    { question: 'ㄱㅇㅈ', answer: '강아지' },
    { question: 'ㄱㅇㅇ', answer: '고양이' },
    { question: 'ㅎㄹㅇ', answer: '호랑이' },
    { question: 'ㄴㄷ', answer: '늑대' },
    { question: 'ㅅㅈ', answer: '사자' },
  ];

  // 타이머 설정
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (!isPaused && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // 타이머가 0이 되었을 때 Timeout 모달 열기
      onTimeoutOpen();
      setIsPaused(true);
      setTimeout(() => {
        onTimeoutClose();
        fetchNextQuestion();
        setIsPaused(false);
      }, 2000);
    }
    return () => clearInterval(timerId);
  }, [isPaused, seconds]);

  // question 의 문자열 길이에 따라 폰트 사이즈를 조절하는 로직
  const [fontSize, setFontSize] = useState('5rem');

  useEffect(() => {
    if (question.length > 6) {
      setFontSize('2rem'); // 6글자 이상일 때 글씨 크기를 줄임
    } else if (question.length > 4) {
      setFontSize('3rem'); // 4글자 이상일 때 글씨 크기를 줄임
    } else {
      setFontSize('4rem'); // 4글자 이하일 때 글씨 크기를 기본값으로 설정
    }
  }, [question]);

  const fetchNextQuestion = () => {
    const nextIndex = (questionIndex + 1) % data.length;
    setQuestionIndex(nextIndex);
    setQuestion(data[nextIndex].question);
    setSeconds(30); // 새 문제를 가져왔을 때 타이머 리셋
    setAnswerSubmitCount(0); // 새로운 문제로 넘어가면 오답 카운트 초기화
  };

  // 말하기, 쓰기 컴포넌트에서 입력받은 값의 정답여부를 체크하는 함수
  const checkAnswer = (inputAnswer: string) => {
    setIsPaused(true);
    const correctAnswer = data[questionIndex].answer;
    if (inputAnswer === correctAnswer) {
      onCorrectOpen();
      setAnswerSubmitCount(0); // 정답 시 오답 제출 카운트 초기화
    } else {
      onIncorrectOpen();
      setAnswerSubmitCount((prev) => prev + 1); // 오답 시 카운트 증가
      if (answerSubmitCount + 1 >= 3) {
        // 기회가 모두 소진되면 자동으로 다음 문제로 넘어가기
        setTimeout(() => {
          fetchNextQuestion();
          onIncorrectClose();
          setIsPaused(false);
        }, 2000);
        return;
      }
    }

    setTimeout(() => {
      if (inputAnswer === correctAnswer) {
        fetchNextQuestion();
      }
      onCorrectClose();
      onIncorrectClose();
      setIsPaused(false);
      setSeconds(30);
    }, 2000);
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        overflow="hidden"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          backgroundImage={`url(${blackboard})`}
          backgroundSize="332px"
          backgroundPosition="top center"
          backgroundRepeat="no-repeat"
          width="320px"
          height="280px"
        >
          <Text color="white" marginTop="72px">
            주제 : {topic}
          </Text>
          <Text color="white" fontSize={fontSize} as="b">
            {question}
          </Text>
        </Flex>
        {/* 타이머 표시 */}
        <Text margin={4} fontSize="2xl" color="red">
          남은 시간: {seconds}초
        </Text>
        <Text margin={4}>{3 - answerSubmitCount}번의 기회가 남았어요!</Text>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          width="100%"
          maxWidth="320px"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <Chance setIsPaused={setIsPaused} />
          </GridItem>
          <GridItem colSpan={1}>
            <Pass
              fetchNextQuestion={fetchNextQuestion}
              setIsPaused={setIsPaused}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <AnswerSpeak setIsPaused={setIsPaused} checkAnswer={checkAnswer} />
          </GridItem>
          <GridItem colSpan={1}>
            <AnswerWrite setIsPaused={setIsPaused} checkAnswer={checkAnswer} />
          </GridItem>
        </Grid>
      </Flex>
      <Correct isOpen={isCorrectOpen} onClose={onCorrectClose} />
      <Incorrect
        isOpen={isIncorrectOpen}
        onClose={onIncorrectClose}
        onNextQuestion={fetchNextQuestion}
      />
      <Timeout isOpen={isTimeoutOpen} onClose={onTimeoutClose} />
    </>
  );
};

export default Game;
