import { Box } from '@chakra-ui/react';
import React from 'react';
import CallList from '../../components/meetings/CallList';

const Previous = () => {
  return (
    <Box width={'100%'}>
      <CallList type="ended" />
    </Box>
  );
};

export default Previous;
