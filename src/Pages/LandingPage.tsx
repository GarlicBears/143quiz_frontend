import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
//First Page
const LandingPage = () => {
  const navigate = useNavigate();

  function handleClickLogin() {
    navigate('/login');
  }

  function hadleClickSignup() {
    navigate('/signup');
  }

  return (
    <Container
      flex="1"
      maxW="container.md"
      mt={4}
      width={{ base: '100%', md: '720px' }}
      bg="var(--background-color)"
      overflowY="auto"
      paddingBottom="200px"
      border="0px solid black"
    >
      <Box
        border="0px solid brown"
        minH="90vh"
        py={10}
        px={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Card
          h="500px"
          w="100%"
          backgroundColor="green.600"
          border="5px solid orange"
        >
          <CardHeader></CardHeader>
          <CardBody border="0px solid red"></CardBody>
          <CardFooter border="0px solid blue">
            <SimpleGrid columns={4} spacing="1px">
              {/*<Box bg="tomato" w="40px" h="40px"></Box>*/}
            </SimpleGrid>
          </CardFooter>
        </Card>
        <ButtonGroup mt={5} w="100%" gap={2}>
          <Button
            justifyContent="center"
            w="100%"
            backgroundColor="orange.400"
            onClick={handleClickLogin}
          >
            로그인하기
          </Button>
          <Button
            w="100%"
            justifyContent="center"
            backgroundColor="orange.400"
            onClick={hadleClickSignup}
          >
            회원가입하기
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default LandingPage;
