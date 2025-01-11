import { Box, Center, Spinner } from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCallById } from '../../hooks/useGetCallById';
import MeetingSetup from '../../components/meetings/MeetingSetup';
import MeetingRoom from '../../components/meetings/MeetingRoom';

const Meeting = () => {
  const { id } = useParams();

  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) {
    return (
      <Box as="main" height="100vh" width="100%">
        <Center mt={70}>
          <Spinner />{' '}
        </Center>
      </Box>
    );
  }

  return (
    <Box as="main" height="100vh" width="100%">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </Box>
  );
};

export default Meeting;
