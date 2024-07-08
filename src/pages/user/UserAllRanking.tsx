import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Center,
  Heading,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

interface Ranking {
  userId: number;
  nickname: string;
  totalBadges: number;
  totalHearts: number;
  rank: number;
}

// 전체 뱃지 수 하트 수를 기준으로 랭킹 정보 조회
// 토글로 뱃지 랭킹 주제 랭킹 조회
const UserAllRanking = () => {
  const [rankingData, setRankingData] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/game/rankings')
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setRankingData(response.data);
        } else {
          console.error('Unexpected API response format', response.data);
        }
      })
      .catch((error) => {
        console.error('랭킹 데이터 조회 중 오류 발생', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Center>
        <Card w="100%">
          <Heading textAlign="center" mt={20}>
            <FontAwesomeIcon icon={faTrophy} style={{ color: '#FFD43B' }} />{' '}
            Game Ranking
            <FontAwesomeIcon icon={faTrophy} style={{ color: '#FFD43B' }} />
          </Heading>
          <Box border="2px solid">
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
                {/*<AccordionPanel pb={4}>abcd12341234</AccordionPanel>*/}
                <AccordionPanel pb={4}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <List spacing={3}>
                      {rankingData.map((user) => (
                        <ListItem key={user.userId}>
                          {user.nickname} - Badges: {user.totalBadges}, Hearts:{' '}
                          {user.totalHearts}
                        </ListItem>
                      ))}
                    </List>
                  )}
                </AccordionPanel>
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
