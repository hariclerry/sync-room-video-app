import { Box, Flex, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import CardWithBackgroundImage from '../../components/commons/Card';
import { FaCalendar, FaPlus, FaVideo, FaUserPlus } from 'react-icons/fa6';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingModal from '../../components/meetings/meetingModal';
import { useUser } from '@clerk/clerk-react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toaster } from '../../components/ui/toaster';
import DatePicker from 'react-datepicker';
import MeetingTypeCard from '../../components/meetings/MeetingTypeCard';

const Home = () => {
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  const [callDetail, setCallDetail] = useState<Call>();
  const navigate = useNavigate();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const startMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toaster.error({
          description: 'Please select a date and time',
          duration: 6000,
        });

        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        navigate(`/meeting/${call.id}`);
      }

      toaster.success({
        description: 'Meeting Created Successfully',
        duration: 6000,
        placement: 'top-end',
      });
    } catch (error) {
      console.log(error);
      toaster.error({
        description: 'Failed to create meeting',
        duration: 6000,
      });
    }
  };
  const meetingLink = `${import.meta.env.VITE_PUBLIC_BASE_URL}/meeting/${
    callDetail?.id
  }`;

  return (
    <Box>
      <Box>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          p={4}
          wrap="wrap"
          alignItems={'center'}
        >
          <CardWithBackgroundImage />

          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 4 }}
            gap={6}
            p={4}
            width="100%"
          >
            <MeetingTypeCard
              icon={
                <FaPlus
                  size="40px"
                  color="white"
                  style={{
                    background: 'rgb(205 191 191 / 25%)',
                    borderRadius: '50%',
                    padding: '5px',
                  }}
                />
              }
              title="New Meeting"
              description="Start an instant meeting"
              bgColor="#830EF9"
              onClick={() => setMeetingState('isInstantMeeting')}
            />
            <MeetingTypeCard
              icon={<FaCalendar size="30px" color="white" />}
              title="Schedule Meeting "
              description="Plan your meeting"
              bgColor="#FF742E"
              onClick={() => setMeetingState('isScheduleMeeting')}
            />
            <MeetingTypeCard
              icon={<FaUserPlus size="35px" color="white" />}
              title="Join Meeting"
              description="via invitation link"
              bgColor="#106107"
              onClick={() => setMeetingState('isJoiningMeeting')}
            />
            <MeetingTypeCard
              icon={<FaVideo size="32px" color="white" />}
              title="View Recordings"
              description="Navigate to all your recordings"
              bgColor="#F9A90E"
              onClick={() => navigate('/recordings')}
            />
          </SimpleGrid>
        </Flex>
        <MeetingModal
          isOpen={meetingState === 'isInstantMeeting'}
          title="Start an Instant Meeting"
          buttonText="Start Meeting"
          onClose={() => setMeetingState(undefined)}
          onClick={() => startMeeting()}
        />
        <MeetingModal
          isOpen={meetingState === 'isJoiningMeeting'}
          title="Type the link here"
          buttonText="Join Meeting"
          onClose={() => setMeetingState(undefined)}
          onClick={() => navigate(values.link)}
        >
          <Input
            type="text"
            bg={'#100f0f'}
            outline={'none'}
            borderColor="gray.800"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
          />
        </MeetingModal>
        {!callDetail ? (
          <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            title="Schedule New Meeting"
            buttonText="Schedule Meeting"
            onClose={() => setMeetingState(undefined)}
            onClick={() => startMeeting()}
          >
            <Flex flexDirection={'column'} gap={8}>
              <VStack gap={3} alignItems={'flex-start'}>
                <Text>Meeting Description</Text>
                <Input
                  type="textarea"
                  bg={'#100f0f'}
                  height={20}
                  // border={'none'}
                  outline={'none'}
                  borderColor="gray.800"
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </VStack>

              <VStack gap={3} alignItems={'flex-start'}>
                <Text> Select Date and Time</Text>
                <DatePicker
                  selected={values.dateTime}
                  onChange={(date) => setValues({ ...values, dateTime: date! })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                />
              </VStack>
            </Flex>
          </MeetingModal>
        ) : (
          <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toaster.success({ title: 'Link Copied' });
            }}
            buttonText="Copy Meeting Link"
          />
        )}
      </Box>
      {/* <Box width={'100%'} mt={12}>
        <Center as={'h1'} mb={5}>
          Today's Upcoming Meetings
        </Center>
        <CallList type="today" />
      </Box> */}
    </Box>
  );
};

export default Home;
