import { Box } from '@chakra-ui/react';
import CallList from '../../components/meetings/CallList';

const Recordings = () => {
  return (
    <Box width={'100%'}>
      <CallList type="recordings" />
    </Box>
  );
};

export default Recordings;
