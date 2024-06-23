import { atom } from 'recoil';

// 답변 제출 횟수
export const answerSubmitCountState = atom({
  key: 'answerSubmitCountState',
  default: 0,
});

// 선택한 주제 정보
interface QuestionType {
  questionId: number;
  questionText: string;
  answerText: string;
}
export const topicIdState = atom<number | null>({
  key: 'topicIdState',
  default: null,
});
export const titleState = atom<string>({
  key: 'titleState',
  default: '',
});
export const questionsState = atom<QuestionType[]>({
  key: 'questionsState',
  default: [],
});
export const sessionIdState = atom<number | 0>({
  key: 'sessionIdState',
  default: 0,
});

// 서버에 보낼 답변 리스트
interface AnswerType {
  questionId: number;
  answerText: string;
  answerStatus: string;
  hintUsageCount: number;
  answerTimeTaken: number;
  answerAt: string;
}

export const answersState = atom<AnswerType[]>({
  key: 'answersState',
  default: [],
});
