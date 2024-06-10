import React from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import blackboard from '../Asset/images/blackboard.png';
import CustomButton from '../Components/Common/CustomButton';
import buttonSound from '../Asset/audios/button.mp3';

const Game = () => {
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
          <Text color="white">주제 : </Text>
          <Text color="white" size="lg">
            ㅅㄱ
          </Text>
        </Flex>
        <Text margin={4}>n번의 기회가 남았어요!</Text>
        {/*버튼 그리드*/}
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          width="100%"
          maxWidth="320px"
          gridAutoColumns={{ base: '1fr', md: '1fr' }}
          justifyContent="center"
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <CustomButton
              text="찬스"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CustomButton
              text="패스"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CustomButton
              text="말하기"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CustomButton
              text="쓰기"
              variant="outline"
              soundSrc={buttonSound}
              baseWidth={148}
              width={200}
            />
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
export default Game;
