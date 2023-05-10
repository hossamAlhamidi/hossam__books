import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Divider,
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import {  MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { CiViewTimeline } from 'react-icons/ci';

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

interface ISidebar {
  isMobile: boolean;
  showSideNav: boolean;
  setShowSideNav: Dispatch<SetStateAction<true | false>>;
}

const Sidebar = ({ isMobile, showSideNav, setShowSideNav }: ISidebar) => {
  const { toggleColorMode } = useColorMode();
  const colorMode = useColorModeValue('light', 'dark');

  const data = [
    {
      id: 1,
      name: 'Reading List',
      path: '/',
      icon: <CiViewTimeline style={{ marginRight: 8, fontSize: '24px' }} />,
      isVisible: true,
    },
    {
      id: 2,
      name: 'Search',
      path: '/search',
      icon: <FiSearch style={{ marginRight: 8, fontSize: '24px' }} />,
      isVisible: true,
    },
  ];

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
        {showSideNav && (
          <Flex flex="1 1 auto" alignItems="center">
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
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
