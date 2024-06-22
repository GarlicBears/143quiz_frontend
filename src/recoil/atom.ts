import { atom } from 'recoil';

export const answerSubmitCountState = atom({
  key: 'answerSubmitCountState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
