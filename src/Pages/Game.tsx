import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import blackboard from '../Asset/images/blackboard.png';
import CustomButton from '../Components/Common/CustomButton';
import buttonSound from '../Asset/audios/button.mp3';
import Chance from '../Components/Game/Chance';
import Pass from '../Components/Game/Pass';

const Game = () => {
  const [seconds, setSeconds] = useState(30); // 타이머 상태
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('ㄱㄸㅂㄹ');
  const topic = '동물';
  const wrongAnswerSubmit = 0;

  const data = [{ question: ['ㄱㅇㅇ', 'ㅎㄹㅇ', 'ㄱㄱㄹ'] }];

  // 타이머 설정
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (!isPaused && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // 타이머가 0이 되었을 때 실행할 동작 추가 (예: 알림 표시)
      alert('시간이 종료되었습니다!');
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
    const nextIndex = (questionIndex + 1) % data[0].question.length;
    setQuestionIndex(nextIndex);
    setQuestion(data[0].question[nextIndex]);
    setSeconds(30); // 새 문제를 가져왔을 때 타이머 리셋
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
        <Text margin={4}>{3 - wrongAnswerSubmit}번의 기회가 남았어요!</Text>
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
            <CustomButton
              text="말하기"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
              onClick={() => alert('말하기 버튼을 클릭했습니다.')}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CustomButton
              text="쓰기"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
              onClick={() => alert('쓰기 버튼을 클릭했습니다.')}
            />
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Game;
