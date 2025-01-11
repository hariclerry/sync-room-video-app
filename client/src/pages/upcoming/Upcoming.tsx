import CallList from '../../components/meetings/CallList';
import { Box } from '@chakra-ui/react';

const Upcoming = () => {
  return (
    <Box width={'100%'}>
      <CallList type="upcoming" />
    </Box>
  );
};

export default Upcoming;
