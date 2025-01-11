import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { Checkbox } from '../ui/checkbox';
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.'
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  return (
    <Box
      display="flex"
      height="100vh"
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      color="white"
    >
      <Text textAlign="center" fontSize="2xl" fontWeight="bold">
        Setup
      </Text>
      <VideoPreview />
      <HStack gap={4}>
        <Checkbox
          fontSize={'2xl'}
          checked={isMicCamToggled}
          onChange={() => setIsMicCamToggled(!isMicCamToggled)}
        >
          {' '}
          Join with mic and camera off
        </Checkbox>
        <DeviceSettings />
      </HStack>

      <Button
        backgroundColor={'green'}
        _hover={{
          borderColor: 'green',
        }}
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </Box>
  );
};

export default MeetingSetup;
