import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MinimalLayout = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Outlet />
    </Box>
  );
};

export default MinimalLayout;
