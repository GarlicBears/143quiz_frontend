import React, { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Text,
  Grid,
  GridItem,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
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
} from '../../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import heartImage from '../../asset/images/heart64.png';
import whiteHeartImage from '../../asset/images/heartwhite.png';

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
  const [isEnded, setIsEnded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerSubmitCount, setAnswerSubmitCount] = useRecoilState(
    answerSubmitCountState,
  );
  const [answers, setAnswers] = useRecoilState(answersState);
  const [fontSize, setFontSize] = useState('4rem');
  const navigate = useNavigate();

  const topicId = useRecoilValue(topicIdState);
  const title = useRecoilValue(titleState);
  const [heartsCount, setHeartsCount] = useState(0);
  const sessionId = useRecoilValue(sessionIdState);

  const [questions, setQuestions] = useRecoilState(questionsState);
  const [question, setQuestion] = useState('');

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

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
      setQuestion(questions[questionIndex].questionText);
    }
  }, [questions, questionIndex]);

  // 게임 종료 처리
  useEffect(() => {
    console.log('isEnded:', isEnded);
    if (isEnded) {
      const gameResult = {
        topicId,
        sessionId,
        heartsCount,
        answers,
      };
      console.log('gameResult:', gameResult);

      const endGame = async () => {
        try {
          const res = await axiosInstance.post('/game/answer', gameResult);
          const { getBadge, totalQuestions, userHeartsCount } = res.data;
          if (getBadge) {
            navigate('/game/earnbadge');
          } else {
            navigate('/game/complete', {
              state: { userHeartsCount, totalQuestions },
            });
          }
        } catch (error) {
          console.error('Error ending game:', error);
        } finally {
          setHeartsCount(0);
          setAnswers([]);
          setAnswerSubmitCount(0);
          setQuestionIndex(0);
          setIsEnded(false);
        }
      };
      endGame();
    }
  }, [isEnded]);

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
    if (!isPaused && seconds > 0) {
      timerIdRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleTimeout();
    }
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, [isPaused, seconds]);

  // 타임아웃 처리
  const handleTimeout = () => {
    if (timerIdRef.current) clearInterval(timerIdRef.current);
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
      setIsEnded(true);
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
  const checkAnswer = async (
    inputAnswer: string,
    isPass = false,
  ): Promise<void> => {
    if (!questions[questionIndex]) return; // 질문이 없는 경우 반환

    setIsPaused(true);
    const correctAnswer = questions[questionIndex].answerText;
    const currentQuestion = questions[questionIndex];

    // 동일한 답변이 존재하는지 확인 후, 존재한다면 해당 답변에 오답카운트 업데이트
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onCorrectClose();
      fetchNextQuestion();
    } else {
      if (!isPass) {
        onIncorrectOpen();
      }
      setAnswerSubmitCount((prev) => prev + 1);
      if (answerSubmitCount + 1 >= 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        fetchNextQuestion();
        onIncorrectClose();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onIncorrectClose();
      }
    }

    setIsPaused(false);
    setSeconds(30);
  };

  // 하트 수에 따른 하트 이미지 렌더링
  const heartImageRender = () => {
    const totalHearts = 10; // 총 하트 수, 예시로 3개로 설정
    const hearts = [];

    for (let i = 0; i < totalHearts; i++) {
      if (i < heartsCount) {
        hearts.push(
          <Image key={i} src={heartImage} alt="Heart" boxSize="24px" mx={1} />,
        );
      } else {
        hearts.push(
          <Image
            key={i}
            src={whiteHeartImage}
            alt="Heart"
            boxSize="24px"
            mx={1}
          />,
        );
      }
    }

    return <Flex>{hearts}</Flex>;
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
      <Flex justifyContent="center">{heartImageRender()}</Flex>
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
            answerText={questions[questionIndex]?.answerText}
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
