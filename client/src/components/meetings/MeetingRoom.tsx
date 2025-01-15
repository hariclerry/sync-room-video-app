import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EndCallButton from '../commons/EndCallButton';
import VideoActionsMobile from '../commons/VideoActionsMobile';
import { FaUsers } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion'; // for animations

const MotionGridItem = motion(GridItem); // Motion-enabled GridItem for animations

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const [searchParams] = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  // const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const navigate = useNavigate();

  const callingState = useCallCallingState();

  // Only show the aside on desktop (md and up)
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (callingState !== CallingState.JOINED) {
    return (
      <Center mt={70}>
        <Spinner />{' '}
      </Center>
    );
  }

  // To Do: fix call layout styling and uncomment
  // const CallLayout = () => {
  //   switch (layout) {
  //     case 'grid':
  //       return <PaginatedGridLayout pageArrowsVisible={true} groupSize={9} />;
  //     case 'speaker-right':
  //       return (
  //         <SpeakerLayout
  //           participantsBarPosition="left"
  //           pageArrowsVisible={true}
  //           participantsBarLimit={isDesktopLarge ? 5 : 4}
  //         />
  //       );
  //     default:
  //       return (
  //         <SpeakerLayout
  //           participantsBarPosition="right"
  //           pageArrowsVisible={true}
  //           participantsBarLimit={isDesktopLarge ? 5 : 4}
  //         />
  //       );
  //   }
  // };
  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      overflow="hidden"
      color="white"
    >
      <Box p={4}>
        <Grid
          height={'100vh'}
          templateColumns={{
            base: '1fr',
            md: showParticipants ? '3fr 1fr' : '1fr',
          }}
          gap={2}
          transition="all 0.3s ease-in-out" // Smooth column resizing
        >
          {/* Main Content */}
          <GridItem
            bg="#18181b"
            p={4}
            borderRadius="md"
            transition="all 0.3s ease-in-out"
            placeItems="center"
          >
            <Box
              display="flex"
              width="100%"
              height="100%"
              alignItems="center"
              position="relative"
              justifyContent="center"
            >
              <PaginatedGridLayout
                pageArrowsVisible={true}
                groupSize={isDesktop ? 9 : 3}
              />
            </Box>
          </GridItem>

          <AnimatePresence>
            {isDesktop && showParticipants && (
              <MotionGridItem
                key="aside"
                bg="rgba(0, 0, 0, 0.4)"
                p={4}
                borderRadius="md"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box>
                  {' '}
                  <CallParticipantsList
                    onClose={() => setShowParticipants(false)}
                  />
                </Box>
              </MotionGridItem>
            )}
          </AnimatePresence>
        </Grid>
      </Box>

      <VideoActionsMobile>
        <Box gap="2" flexWrap={'wrap'} mt="15px" justifyContent={'center'}>
          <CallControls onLeave={() => navigate(`/`)} />
        </Box>
      </VideoActionsMobile>

      <Box
        position="fixed"
        bottom={0}
        display={{ base: 'none', md: 'flex' }}
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={5}
        flexWrap={'wrap'}
      >
        <CallControls onLeave={() => navigate(`/`)} />

        <HStack>
          {' '}
          <CallStatsButton />
        </HStack>
        <HStack>
          {' '}
          <Button
            onClick={() => setShowParticipants((prev) => !prev)}
            cursor={'pointer'}
            rounded={'full'}
            bg={'#19232d'}
            _hover={{ backgroundColor: '#4c535b', border: 'none' }}
          >
            <FaUsers size={20} color="#fff" />
          </Button>
          {!isPersonalRoom && <EndCallButton />}
        </HStack>
      </Box>
    </Box>
  );
};

export default MeetingRoom;
