import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axiosInstance from '../../api/axiosInstance';

interface Ranking {
  userId: number;
  nickname: string;
  totalBadges: number;
  totalHearts: number;
  rank: number;
}

function TotalRanking() {
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
    <TableContainer border="1px solid gray" borderRadius="lg">
      <Table
        overflowY="auto"
        variant="simple"
        sx={{ 'th, td': { textAlign: 'center' } }}
      >
        <Thead>
          <Tr bg="#ffb691">
            <Th>순위</Th>
            <Th>별명</Th>
            <Th>전체 뱃지 수</Th>
            <Th>전체 하트 수</Th>
          </Tr>
        </Thead>
        <Tbody h={10} overflowY="auto">
          {rankingData.map((user) => (
            <Tr key={user.userId}>
              <Td>{user.rank}</Td>
              <Td>{user.nickname}</Td>
              <Td>{user.totalBadges}</Td>
              <Td>{user.totalHearts}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TotalRanking;
