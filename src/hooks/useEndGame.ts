import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import {
  answersState,
  topicIdState,
  sessionIdState,
  answerSubmitCountState,
} from '../recoil/atoms';

const useEndGame = (
  setAnswers: React.Dispatch<React.SetStateAction<any[]>>,
  setHeartsCount: React.Dispatch<React.SetStateAction<number>>,
  setAnswerSubmitCount: React.Dispatch<React.SetStateAction<number>>,
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
  const topicId = useRecoilValue(topicIdState);
  const sessionId = useRecoilValue(sessionIdState);
  const answers = useRecoilValue(answersState);
  const heartsCount = useRecoilValue(answerSubmitCountState);
  const navigate = useNavigate();

  const endGame = async () => {
    const gameResult = {
      topicId,
      sessionId,
      heartsCount,
      answers,
    };

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
      alert('게임 종료 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      // 게임 리셋, 새로운 게임세션 불러오기
      setHeartsCount(0);
      setAnswers([]);
      setAnswerSubmitCount(0);
      setQuestionIndex(0);
    }
  };

  return { endGame };
};

export default useEndGame;
