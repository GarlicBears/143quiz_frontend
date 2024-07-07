import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Center,
  Divider,
  Heading,
} from '@chakra-ui/react';
// 전체 뱃지 수 하트 수를 기준으로 랭킹 정보 조회
// 토글로 뱃지 랭킹 주제 랭킹 조회
const UserAllRanking = () => {
  useEffect(() => {});

  return (
    <>
      <Center>
        <Card w="100%">
          <Heading textAlign="center" mt={20}>
            {' '}
            Game Ranking{' '}
          </Heading>
          <Box border="2px solid" m={20}>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      All Game Ranking Top 100
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>abcd12341234</AccordionPanel>
              </AccordionItem>

              <AccordionItem mt={20}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      All Game Ranking Top 100
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>abcd12341234</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Card>
      </Center>
    </>
  );
};

export default UserAllRanking;
