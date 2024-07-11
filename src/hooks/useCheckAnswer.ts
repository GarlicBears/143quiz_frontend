import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import {
  answerSubmitCountState,
  answersState,
  questionsState,
} from '../recoil/atoms';

interface AnswerType {
  questionId: number;
  answerText: string;
  answerStatus: string;
  hintUsageCount: number;
  answerTimeTaken: number;
  answerAt: string;
}

const useCheckAnswer = (
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
  setSeconds: React.Dispatch<React.SetStateAction<number>>,
  fetchNextQuestion: () => void,
) => {
  const [answerSubmitCount, setAnswerSubmitCount] = useRecoilState(
    answerSubmitCountState,
  );
  const [answers, setAnswers] = useRecoilState(answersState);
  const [heartsCount, setHeartsCount] = useState(0);
  const questions = useRecoilValue(questionsState);

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

  const formatDate = (date: Date): string => {
    return date.toLocaleString('sv-SE').slice(0, 19);
  };

  const checkAnswer = async (
    inputAnswer: string,
    questionIndex: number,
    seconds: number,
    isPass = false,
  ): Promise<void> => {
    if (!questions[questionIndex]) return;

    setIsPaused(true);
    const correctAnswer = questions[questionIndex].answerText;
    const currentQuestion = questions[questionIndex];

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

  return {
    checkAnswer,
    heartsCount,
    isCorrectOpen,
    onCorrectClose,
    isIncorrectOpen,
    onIncorrectClose,
  };
};

export default useCheckAnswer;
