import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Image,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdGridView, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { BiServer } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiTool, FiAlertTriangle } from 'react-icons/fi';
import { GiBinoculars } from 'react-icons/gi';
import { RiSearchLine } from 'react-icons/ri';

import {
  RiAlertFill,
  RiBookOpenFill,
  RiEdit2Fill,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { TfiBag } from 'react-icons/tfi';
import { SlUser } from 'react-icons/sl';
import { CiViewTimeline } from 'react-icons/ci';
import { useQueryClient } from 'react-query';

import { Navigate } from 'react-router-dom';
const Sidebar = ({ isMobile, showSideNav, setShowSideNav }: any) => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  // const detection_rule_isVisible = getPermissionsAlt(permissions,"_indicator",userType).userActions.view
  const data = [
    {
      id: 1,
      name: 'Reading List',
      path: '/',
      icon: <MdGridView style={{ marginRight: 8, fontSize: '24px' }} />,
      isVisible: true,
    },
    {
      id: 2,
      name: 'Search',
      path: '/search',
      icon: <CiViewTimeline style={{ marginRight: 8, fontSize: '24px' }} />,
      isVisible: true,
    },
    
  ];

  const { toggleColorMode } = useColorMode();
  const colorMode = useColorModeValue('light', 'dark');

  const activeStyle = {
    backgroundColor: '#1152BA',
    // width: '240px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    height: '44px',
    borderRadius: ' 0px 4.55887px 4.55887px 0px',
    lineHeight: '16.94px',
    color: '#fff',
    margin: '16px 0',
    padding: '8px',
    paddingLeft: '20px',
  };

  return (
    <Box
      h={'100vh'}
      // w="270px"
      top={0}
      overflowY="hidden"
      position={'fixed'}
      boxShadow="md"
      bgColor={colorMode === 'light' ? '#145DA0' : '#1E1F23'}
      // color={colorMode === "light" ? "#00024C" : "#1E1F23"}
      zIndex={isMobile ? '999' : ''}
      w={showSideNav ? '270px' : isMobile ? '0px' : '65px'}
      transition="0.3s all ease-in-out"
      display={'flex'}
      flexDir={'column'}
    >
      {/* Sidebar Logo Section */}
      <Flex
        height="64px"
        padding={showSideNav ? '12px 20px' : '0px 0px 0px 5px'}
        alignItems="center"
        justifyContent={'center'}
      >
        {/* {!showSideNav && (
            <Image src='/img/cognna.svg' height='30px' alt='Cight' mr={'5px'} />
          )} */}
        {showSideNav && (
          <Flex flex="1 1 auto" alignItems="center">
            {/* <Image
                src='/img/cognna.svg'
                height='40px'
                marginRight='12px'
                alt='Cight'
              /> */}
            <Text fontWeight={700} fontSize="22px" color="#fff">
              My Books
            </Text>
          </Flex>
        )}
        {showSideNav ? (
          <MdArrowBackIos
            height="65px"
            color="#A7A9C0"
            onClick={() => setShowSideNav((prev: boolean) => !prev)}
          />
        ) : (
          <MdArrowForwardIos
            height="65px"
            color="#A7A9C0"
            onClick={() => setShowSideNav((prev: boolean) => !prev)}
          />
        )}
      </Flex>
      <Divider />

      {/* Main Sidebar Menu Items */}
      <Box
        display={'flex'}
        flex={1}
        flexDir={'column'}
        justifyContent={'space-between'}
        maxHeight="calc(100vh - 64px)"
      >
        {/* bgColor={colorMode === 'light' ? '#00024C' : '#1E1F23'} */}
        <Flex
          // height="calc(100% - 206px)"
          height={'auto'}
          flexDir={'column'}
          // overflowY={'scroll'}
          overflowX={'hidden'}
          sx={{
            '::-webkit-scrollbar': {
              width: '10px',
              backgroundColor: colorMode === 'light' ? '#263159' : '#1E1F23',
            },
            '::-webkit-scrollbar-thumb': {
              background: colorMode === 'light' ? '#DBE2EF' : '#888',
            },
          }}
        >
          {data.map(
            (item, _pIndex) =>
              item.isVisible && (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) =>
                    isActive
                      ? activeStyle
                      : { ...activeStyle, backgroundColor: '', width: '100%' }
                  }
                >
                  {item.icon}
                  {showSideNav && item.name}
                </NavLink>
              )
          )}
        </Flex>

        {/* Sidebar Footer Section */}
        <Box>
          <Divider />
          <Flex
            flexDir={'column'}
            padding={showSideNav ? '16px' : '4px'}
            textAlign={'center'}
          >
            <Flex
              flexDir={showSideNav ? 'row' : 'column-reverse'}
              justifyContent="space-between"
              alignItems={'center'}
            >
              <Text
                fontWeight={400}
                fontSize={showSideNav ? '14px' : '12px'}
                color="#fff"
              >
                Dark Mode
              </Text>
              <Switch
                size="lg"
                variant="primary"
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </Flex>
            {/* <Flex
                flexDir={showSideNav ? 'row' : 'column-reverse'}
                justifyContent='space-between'
                alignItems={'center'}
                mt={5}
              >
                <Text
                  fontWeight={400}
                  fontSize={showSideNav ? '14px' : '12px'}
                  color='#fff'
                >
                Logout
                </Text>
                <Button bg={'transparent'} isLoading={isLoading} onClick={logout} p={0} _hover={{border:'1px solid white'}}>
                <RiLogoutBoxRLine style={{ marginRight: 8,cursor:'pointer', fontSize: '24px', color:'red'}} />
                </Button>
              </Flex> */}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
