import React from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import {
  ArrowBackIcon,
  SettingsIcon,
  BellIcon,
  InfoIcon,
} from '@chakra-ui/icons';

const Header = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      padding="2"
      bg="gray.50"
      borderBottom="1px"
      borderColor="gray.200"
      width="80%"
    >
      <IconButton
        icon={<ArrowBackIcon />}
        variant="ghost"
        aria-label="Back"
        border="none"
        backgroundColor="transparent"
      />
      <p>이전으로</p>
      <HStack spacing="2">
        <IconButton
          icon={<InfoIcon />}
          variant="ghost"
          aria-label="Home"
          border="none"
          backgroundColor="transparent"
        />
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          aria-label="Notifications"
          border="none"
          backgroundColor="transparent"
        />
        <IconButton
          icon={<SettingsIcon />}
          variant="ghost"
          aria-label="Settings"
          border="none"
          backgroundColor="transparent"
        />
      </HStack>
    </HStack>
  );
};

export default Header;
