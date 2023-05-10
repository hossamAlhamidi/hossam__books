import React, { useState, useEffect } from 'react';
import { Box, Flex, useColorModeValue, useToast } from '@chakra-ui/react';
import Sidebar from '../Sidebar';

import { MdMenu } from 'react-icons/md';

import Navbar from '../Navbar/Navbar';

interface IPrivateRouteLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: IPrivateRouteLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(true);

  useEffect(() => {
    function resize() {
      if (window.innerWidth < 1065) {
        setShowSideNav(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setShowSideNav(true);
      }
    }
    resize();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);


  return (
    <Box
      display={'flex'}
      flexDirection="column"
      w="100%"
      minHeight="100vh"
      position="relative"
    >
      <>
        <Navbar></Navbar>
        <Box
          width={
            showSideNav
              ? 'calc(100% - 270px)'
              : isMobile
              ? 'calc(100% - 0px)'
              : 'calc(100% - 65px)'
          }
          transition="0.3s all ease-in-out"
          bg={useColorModeValue('lightMode.bodyBg', 'darkMode.bodyBg')}
          // h="64px"
          top={0}
          left={270}
          display={isMobile ? 'flex' : 'flex'}
          alignItems={isMobile ? 'center' : 'center'}
        >
          {isMobile && !showSideNav && (
            <MdMenu
              onClick={() => setShowSideNav((prev) => !prev)}
              cursor={'pointer'}
              fontSize={'30px'}
              style={{ marginInlineStart: '10px' }}
            />
          )}
        </Box>
      </>

      <Flex>
        <Sidebar {...{ isMobile, showSideNav, setShowSideNav }} />
        <Box
          // ml={!showSideNav ? '65px' : !isMobile ? '270px' : ''}
          ml={!showSideNav && !isMobile ? '65px' : !isMobile ? '270px' : ''}
          // width="100%"
          width={
            showSideNav && !isMobile
              ? 'calc(100%)'
              : isMobile
              ? 'calc(100% - 0px)'
              : 'calc(100% - 65px)'
          }
          transition="0.3s all ease-in-out"
          overflowX="hidden"
          p={'20px 27px'}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
