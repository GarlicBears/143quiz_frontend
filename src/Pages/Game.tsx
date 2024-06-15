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
  const [seconds, setSeconds] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('ㄱㄸㅂㄹ');
  const [answerSubmitCount, setAnswerSubmitCount] = useRecoilState(
    answerSubmitCountState,
  );
  const [fontSize, setFontSize] = useState('4rem');
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

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (!isPaused && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleTimeout();
    }
    return () => clearInterval(timerId);
  }, [isPaused, seconds]);

  const handleTimeout = () => {
    onTimeoutOpen();
    setIsPaused(true);
    setTimeout(() => {
      onTimeoutClose();
      fetchNextQuestion();
      setIsPaused(false);
    }, 2000);
  };

  useEffect(() => {
    const fontSize =
      question.length > 6 ? '2rem' : question.length > 4 ? '3rem' : '4rem';
    setFontSize(fontSize);
  }, [question]);

  const fetchNextQuestion = () => {
    const nextIndex = (questionIndex + 1) % data.length;
    setQuestionIndex(nextIndex);
    setQuestion(data[nextIndex].question);
    setSeconds(30);
    setAnswerSubmitCount(0);
  };

  const checkAnswer = (inputAnswer: string) => {
    setIsPaused(true);
    const correctAnswer = data[questionIndex].answer;
    if (inputAnswer === correctAnswer) {
      onCorrectOpen();
      setAnswerSubmitCount(0);
    } else {
      onIncorrectOpen();
      setAnswerSubmitCount((prev) => prev + 1);
      if (answerSubmitCount + 1 >= 3) {
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
      <Correct isOpen={isCorrectOpen} onClose={onCorrectClose} />
      <Incorrect
        isOpen={isIncorrectOpen}
        onClose={onIncorrectClose}
        onNextQuestion={fetchNextQuestion}
      />
      <Timeout isOpen={isTimeoutOpen} onClose={onTimeoutClose} />
    </Flex>
  );
};

export default Game;
