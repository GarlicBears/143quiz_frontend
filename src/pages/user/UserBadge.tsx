// import React, { useState } from 'react';
// import {
//   Text,
//   Image,
//   Box,
//   Grid,
//   GridItem,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalOverlay,
//   ModalHeader,
//   useDisclosure,
//   Flex,
// } from '@chakra-ui/react';
// import topicList from '../../asset/topicList';
// import badgeIcon from '../../asset/images/badge48.png';
// function UserBadge() {
//   const { isOpen, onOpen, onClose } = useDisclosure(); // 모달의 초기 상태를 닫힌 상태로 설정
//   return (
//     <>
//       <Flex
//         onClick={onOpen}
//         cursor="pointer"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Image src={badgeIcon} boxSize="30px" mr={2} />
//         <Text>내가 모은 뱃지</Text>
//       </Flex>
//
//       <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             <Flex alignItems="center" justifyContent="center">
//               <Image src={badgeIcon} boxSize="30px" mr={2} />
//               <Text>내가 모은 뱃지</Text>
//             </Flex>
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody maxHeight="calc(100vh - 210px)" overflowY="auto">
//             <Grid templateColumns="repeat(2, 1fr)" gap={5}>
//               {topicList.map((topic, index) => (
//                 <GridItem key={index} w="100%">
//                   <Box
//                     borderRadius="2xl"
//                     border="1px solid orange"
//                     overflow="hidden"
//                     textAlign="center"
//                     w="100%"
//                     p={3}
//                   >
//                     <Box
//                       border="1px solid orange"
//                       borderRadius="full"
//                       bg="orange.100"
//                       boxSize="80px"
//                       m="auto"
//                     >
//                       <Image
//                         src={topic.imgSrc}
//                         borderRadius="full"
//                         boxSize="50px"
//                         m="auto"
//                         mt={4}
//                       />
//                     </Box>
//                     <Text mt={2}>{topic.name}</Text>
//                   </Box>
//                 </GridItem>
//               ))}
//             </Grid>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
//
// export default UserBadge;

import React, { useState } from 'react';
import {
  Text,
  Image,
  Box,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import topicList from '../../asset/topicList';
import badgeIcon from '../../asset/images/badge48.png';
import UserRank from './UserRank';

type Topic = {
  name: string;
  imgSrc: string;
};

function UserBadge() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const {
    isOpen: isRankingOpen,
    onOpen: onRankingOpen,
    onClose: onRankingClose,
  } = useDisclosure();

  const handleBadgeClick = (topic: Topic) => {
    setSelectedTopic(topic);
    onRankingOpen();
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        cursor="pointer"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={badgeIcon} boxSize="30px" mr={2} />
        <Text>내가 모은 뱃지</Text>
      </Flex>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" justifyContent="center">
              <Image src={badgeIcon} boxSize="30px" mr={2} />
              <Text>내가 모은 뱃지</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="calc(100vh - 210px)" overflowY="auto">
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
              {topicList.map((topic, index) => (
                <GridItem key={index} w="100%">
                  <Box
                    borderRadius="2xl"
                    border="1px solid orange"
                    overflow="hidden"
                    textAlign="center"
                    w="100%"
                    p={3}
                    cursor="pointer"
                    onClick={() => handleBadgeClick(topic)}
                  >
                    <Box
                      border="1px solid orange"
                      borderRadius="full"
                      bg="orange.100"
                      boxSize="80px"
                      m="auto"
                    >
                      <Image
                        src={topic.imgSrc}
                        borderRadius="full"
                        boxSize="50px"
                        m="auto"
                        mt={4}
                      />
                    </Box>
                    <Text mt={2}>{topic.name}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/*<Modal size="lg" isOpen={isRankingOpen} onClose={onRankingClose}>*/}
      {/*  <ModalOverlay />*/}
      {/*  <ModalContent>*/}
      {/*    <ModalHeader>*/}
      {/*      <Flex alignItems="center" justifyContent="center">*/}
      {/*        <Text>{selectedTopic?.name} 게임 랭킹</Text>*/}
      {/*      </Flex>*/}
      {/*    </ModalHeader>*/}
      {/*    <ModalCloseButton />*/}
      {/*    <ModalBody>*/}
      {/*      /!* 여기에서 주제별 게임 랭킹 내용을 표시합니다. *!/*/}
      {/*      <Text>랭킹 내용이 여기에 표시됩니다.</Text>*/}
      {/*    </ModalBody>*/}
      {/*  </ModalContent>*/}
      {/*</Modal>*/}
      <UserRank
        isOpen={isRankingOpen}
        onClose={onRankingClose}
        topicName={selectedTopic?.name || ''}
        topic={selectedTopic}
      />
    </>
  );
}

export default UserBadge;
