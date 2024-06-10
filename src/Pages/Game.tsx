import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import blackboard from '../Asset/images/blackboard.png';
import CustomButton from '../Components/Common/CustomButton';
import buttonSound from '../Asset/audios/button.mp3';
import Chance from '../Components/Game/Chance';

const Game = () => {
  const [chance, setChance] = useState(3);
  const topic = '동물';
  const question = 'ㄱㄸㅂㄹ';

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
        <Text margin={4}>{chance}번의 기회가 남았어요!</Text>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          width="100%"
          maxWidth="320px"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <Chance chance={chance} setChance={setChance} />
          </GridItem>
          <GridItem colSpan={1}>
            <CustomButton
              text="패스"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
              onClick={() => alert('패스를 사용했습니다.')}
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
