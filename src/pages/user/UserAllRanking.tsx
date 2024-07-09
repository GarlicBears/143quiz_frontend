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

// tabs로 랭킹 조회
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
                <Tab _selected={{ color: 'white', bg: '#e66119' }}>
                  {selectedTab === 0 && (
                    <FontAwesomeIcon
                      icon={faTrophy}
                      style={{ color: '#FFD43B', marginRight: '8px' }}
                    />
                  )}
                  주제별 게임 랭킹
                </Tab>
                <Tab _selected={{ color: 'white', bg: '#e66119' }}>
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
                  {/*주제별 게임 랭킹*/}
                  <UserRankInfo />
                </TabPanel>
                <TabPanel>
                  {/*전체 게임 랭킹*/}
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
