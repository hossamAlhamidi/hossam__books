import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useToast,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';

// import { useLogOut } from '../../utils/helpers';
import { useNavigate,Link } from 'react-router-dom';
const Links = ['Dashboard', 'Projects', 'Team'];

// const NavLink = ({ children }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}
//   >
//     {children}
//   </Link>
// );

function Navbar() {
  const toast = useToast()


  const { isOpen, onOpen, onClose } = useDisclosure();
//   const logOut = useLogOut();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const navigateProfile = () => {
    navigate('/profile');
  };


  return (
    <>
      <Box
        bg={useColorModeValue('darkMode.white', 'lightMode.secondary.gray')}
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={'center'}>
            {/* <Box>Logo</Box> */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {/* {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))} */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* <Button
              variant={'outline'}
              padding={0}
              border={'none'}
              size={'md'}
              leftIcon={<IoNotificationsOutline />}
            ></Button>
            <Button
              variant={'outline'}
              padding={0}
              border={'none'}
              size={'md'}
              leftIcon={<FiSearch />}
            ></Button> */}
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
