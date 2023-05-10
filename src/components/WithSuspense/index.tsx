import React, { Suspense } from 'react';
import { Box, CircularProgress, useColorModeValue } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100%', height: '100vh' }}
    >
      <CircularProgress
        isIndeterminate
        color={useColorModeValue(
          'darkMode.mainBgColor',
          'lightMode.mainBgColor'
        )}
      />
    </Box>
  );
};

const WithSuspense = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default WithSuspense;
