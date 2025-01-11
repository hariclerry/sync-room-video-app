import { useUser } from '@clerk/clerk-react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useNavigate } from 'react-router-dom';
import { useGetCallById } from '../../hooks/useGetCallById';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { toaster } from '../../components/ui/toaster';
import { FaCopy } from 'react-icons/fa';

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="2"
      sm={{ '@media (min-width: 1280px)': { flexDirection: 'row' } }}
    >
      <Text
        as={'h1'}
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="normal"
        minW={{ xl: '32' }}
        color={'#939191'}
      >
        {title}:
      </Text>
      <Text
        as={'h1'}
        fontSize={{ base: 'sm', md: 'xl' }}
        maxW={{ base: '320px', sm: 'none' }}
        fontWeight={'bold'}
        truncate
        color={'#d1caca'}
      >
        {description}
      </Text>
    </Box>
  );
};

const PersonalRoom = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call('default', meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    navigate(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${
    import.meta.env.VITE_PUBLIC_BASE_URL
  }/meeting/${meetingId}?personal=true`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10"
      color="#d1caca"
      width="100%"
      height="100%"
      px={10}
      pt={5}
    >
      <Text
        as={'h1'}
        fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
        fontWeight="bold"
      >
        Personal Meeting Room
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        gap="8"
        width="100%"
        maxW={{ xl: '900px' }}
      >
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </Box>
      <Flex gap={5}>
        <Button
          bg="#106107"
          onClick={startRoom}
          size={{ md: 'sm', base: 'xs' }}
          fontSize={{ base: 'xs', md: 'xl' }}
          border={'none'}
          _hover={{
            border: 'none',
          }}
          color={'#d1caca'}
        >
          Start Meeting
        </Button>
        <Button
          bg="#222529"
          size={{ md: 'sm', base: 'xs' }}
          fontSize={{ base: 'xs', md: 'xl' }}
          border={'none'}
          color={'#d1caca'}
          _hover={{
            border: 'none',
          }}
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toaster.success({
              title: 'Link Copied',
            });
          }}
        >
          <FaCopy />
          Copy Invitation
        </Button>
      </Flex>
    </Box>
  );
};

export default PersonalRoom;
