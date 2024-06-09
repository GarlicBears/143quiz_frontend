import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';

function MainPage() {
  return (
    <>
      <Center>
        <Box>
          <Card border="1px solid red">
            <CardHeader>
              <Heading></Heading>
            </CardHeader>
            <CardBody>
              <FormControl>
                <FormLabel>이메일</FormLabel>
              </FormControl>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </>
  );
}

export default MainPage;
