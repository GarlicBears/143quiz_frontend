import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import blackboard from '../../asset/images/blackboard.png';
import Chance from '../../components/game/Chance';
import Pass from '../../components/game/Pass';
import AnswerSpeak from '../../components/game/AnswerSpeak';
import AnswerWrite from '../../components/game/AnswerWrite';
import Correct from '../../components/game/Correct';
import Incorrect from '../../components/game/Incorrect';
import Timeout from '../../components/game/Timeout';
import {
  answerSubmitCountState,
  answersState,
  topicIdState,
  titleState,
  questionsState,
  sessionIdState,
} from '../../recoil/atom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

interface AnswerType {
  questionId: number;
  answerText: string;
  answerStatus: string;
  hintUsageCount: number;
  answerTimeTaken: number;
  answerAt: string;
}

const Game = () => {
  const [seconds, setSeconds] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answerSubmitCount, setAnswerSubmitCount] = useRecoilState(
    answerSubmitCountState,
  );
  const [answers, setAnswers] = useRecoilState(answersState);
  const [fontSize, setFontSize] = useState('4rem');
  const navigate = useNavigate();

  const topicId = useRecoilValue(topicIdState);
  const title = useRecoilValue(titleState);
  const questions = useRecoilValue(questionsState);
  const [heartsCount, setHeartsCount] = useState(0);
  const sessionId = useRecoilValue(sessionIdState);

  // 디버깅 용 콘솔로그 : 데이터 수신 확인
  useEffect(() => {
    console.log('Received data:', { topicId, title, questions });
  }, [topicId, title, questions]);

  useEffect(() => {
    console.log('heartsCount:', heartsCount);
    console.log('answers:', answers);
  }, [heartsCount, answers]);

  // 문제 설정
  useEffect(() => {
    if (questions && questions.length > 0 && questionIndex < questions.length) {
      setQuestion(questions[questionIndex].answerText);
    }
  }, [questions, questionIndex]);

  // 모달 상태 설정
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

  // 타이머 설정
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

  // 타임아웃 처리
  const handleTimeout = () => {
    onTimeoutOpen();
    setIsPaused(true);
    setTimeout(() => {
      onTimeoutClose();
      fetchNextQuestion();
      setIsPaused(false);
    }, 2000);
  };

  // 문제 폰트 사이즈 설정
  useEffect(() => {
    const fontSize =
      question?.length > 6 ? '2rem' : question?.length > 4 ? '3rem' : '4rem';
    setFontSize(fontSize);
  }, [question]);

  // 다음 문제 불러오기
  const fetchNextQuestion = () => {
    if (questions.length > 0 && questionIndex < questions.length - 1) {
      const nextIndex = (questionIndex + 1) % questions.length;
      setQuestionIndex(nextIndex);
      setQuestion(questions[nextIndex].questionText);
      setSeconds(30);
      setAnswerSubmitCount(0);
    } else {
      // 모든 문제가 끝났을 때 처리
      endGame();
    }
  };

  // 정답제출 일시 날짜 포맷팅
  const formatDate = (date: Date): string => {
    return date.toLocaleString('sv-SE').slice(0, 19);
  };

  // hintUsageCount 및 answerSubmitCount 업데이트 함수
  const updateHintUsageCount = (questionId: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) => {
        if (answer.questionId === questionId) {
          return { ...answer, hintUsageCount: answer.hintUsageCount + 1 };
        }
        return answer;
      });

      // 만약 해당 questionId가 기존 answers에 없다면 새로 추가
      if (!updatedAnswers.find((answer) => answer.questionId === questionId)) {
        updatedAnswers.push({
          questionId,
          answerText: '',
          answerStatus: '',
          hintUsageCount: 1,
          answerTimeTaken: 0,
          answerAt: formatDate(new Date()),
        });
      }

      return updatedAnswers;
    });
  };

  // 정답 확인 함수
  const checkAnswer = (inputAnswer: string, isPass = false): Promise<void> => {
    return new Promise((resolve) => {
      if (!questions[questionIndex]) return resolve(); // 질문이 없는 경우 반환

      setIsPaused(true);
      const correctAnswer = questions[questionIndex].questionText;
      const currentQuestion = questions[questionIndex];
      // 동일한 답변이 존재하는지 확인 후, 존재한다면 해당 답변에 hintUsageCount 업데이트
      const existingAnswer = answers.find(
        (answer) => answer.questionId === currentQuestion.questionId,
      );

      const newAnswer: AnswerType = {
        questionId: currentQuestion.questionId,
        answerText: inputAnswer,
        answerStatus: isPass ? 'P' : inputAnswer === correctAnswer ? 'Y' : 'N',
        hintUsageCount: existingAnswer ? existingAnswer.hintUsageCount : 0,
        answerTimeTaken: 30 - seconds,
        answerAt: formatDate(new Date()),
      };

      // 답변 중복 송부 방지(quetionId 로 구분, 맨 마지막 답변 송부)
      setAnswers((prevAnswers) =>
        prevAnswers.filter(
          (answer) => answer.questionId !== currentQuestion.questionId,
        ),
      );

      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

      if (inputAnswer === correctAnswer) {
        onCorrectOpen();
        setHeartsCount((prevCount) => prevCount + 1);
        setAnswerSubmitCount(0);
      } else {
        // 패스 버튼 클릭 시에는 오답 모달 생략
        if (!isPass) {
          onIncorrectOpen();
        }
        setAnswerSubmitCount((prev) => prev + 1);
        if (answerSubmitCount + 1 >= 3) {
          setTimeout(() => {
            fetchNextQuestion();
            onIncorrectClose();
            setIsPaused(false);
            resolve();
          }, 1000);
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
        resolve();
      }, 2000);
    });
  };

  // 게임 종료 처리
  const endGame = async () => {
    console.log('endGame called');

    const gameResult = {
      topicId,
      sessionId,
      heartsCount,
      answers,
    };

    console.log('gameResult:', gameResult);

    try {
      const res = await axiosInstance.post('/game/answer', gameResult);
      const { badgeAcquired, totalHearts } = res.data;
      if (badgeAcquired) {
        navigate('/game/earnbadge');
      } else {
        navigate('/game/complete', { state: { totalHearts } });
      }
    } catch (error) {
      console.error('Error ending game:', error);
    } finally {
      // 게임 리셋
      setHeartsCount(0);
      setAnswers([]);
      setAnswerSubmitCount(0);
      setQuestionIndex(0);
    }
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
          주제 : {title}
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
          <Chance
            setIsPaused={setIsPaused}
            updateHintUsageCount={updateHintUsageCount}
            questionId={questions[questionIndex]?.questionId}
            questionText={questions[questionIndex]?.questionText}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Pass
            fetchNextQuestion={fetchNextQuestion}
            setIsPaused={setIsPaused}
            checkAnswer={checkAnswer}
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
