import React, { useState } from 'react';
import {
  Box,
  Card,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import TotalRanking from './TotalRanking';
import UserRankInfo from './UserRankInfo';

// 전체 뱃지 수 하트 수를 기준으로 랭킹 정보 조회
// 토글로 뱃지 랭킹 주제 랭킹 조회
const UserAllRanking = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Center>
        <Card w="100%" h="100%">
          <Box h="100%">
            <Tabs
              isFitted
              variant="enclosed"
              onChange={(index) => setSelectedTab(index)}
            >
              <TabList mb="1em">
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
                  {selectedTab === 0 && (
                    <FontAwesomeIcon
                      icon={faTrophy}
                      style={{ color: '#FFD43B', marginRight: '8px' }}
                    />
                  )}
                  주제별 게임 랭킹
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'green.400' }}>
                  {selectedTab === 1 && (
                    <FontAwesomeIcon
                      icon={faTrophy}
                      style={{ color: '#FFD43B', marginRight: '8px' }}
                    />
                  )}
                  게임 전체 랭킹
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserRankInfo />
                </TabPanel>
                <TabPanel>
                  <TotalRanking />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Card>
      </Center>
    </>
  );
};

export default UserAllRanking;
