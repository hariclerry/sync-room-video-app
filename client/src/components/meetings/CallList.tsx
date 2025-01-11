import React, { useEffect, useState } from 'react';
import { useGetCalls } from '../../hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { Box, Center, Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import MeetingCard from './MeetingCard';
import { LuCalendarArrowDown } from 'react-icons/lu';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { FaPlay, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CallList = ({
  type,
}: {
  type: 'upcoming' | 'ended' | 'recordings' | 'today';
}) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading, todaysCalls } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const navigate = useNavigate();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      case 'today':
        return todaysCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      case 'today':
        return 'No Upcoming meeting Today';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading)
    return (
      <Box as="main" height="100vh" width="100%">
        <Center mt={70}>
          <Spinner />{' '}
        </Center>
      </Box>
    );

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }} gap="8" p="4">
      {calls && calls?.length > 0 ? (
        calls?.map((meeting: Call | CallRecording) => {
          return (
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type === 'ended' ? (
                  <LuCalendarArrowDown size={30} />
                ) : type === 'upcoming' ? (
                  <RiCalendarScheduleFill size={30} />
                ) : (
                  <FaVideo size={30} />
                )
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                'No Description'
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === 'ended'}
              link={
                type === 'recordings'
                  ? (meeting as CallRecording).url
                  : `${import.meta.env.VITE_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              buttonIcon1={type === 'recordings' ? <FaPlay /> : undefined}
              buttonText={type === 'recordings' ? 'Play' : 'Start'}
              recordingLink={(meeting as CallRecording).url}
              handleClick={
                type === 'recordings'
                  ? () => navigate('/recordings')
                  : () => navigate(`/meeting/${(meeting as Call).id}`)
              }
            />
          );
        })
      ) : (
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Text as={'h1'}> {noCallsMessage}</Text>
        </Flex>
      )}
    </SimpleGrid>
  );
};

export default CallList;
