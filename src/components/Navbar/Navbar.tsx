import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  useColorModeValue,
} from '@chakra-ui/react';

function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue('darkMode.white', '#1E1F23')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            {/* <Box>Logo</Box> */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            ></HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                margin={2}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={'/img/moha.png'} />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      {/* 
      <Box p={4}>Main Content Here</Box> */}
    </>
  );
}

export default Navbar;
