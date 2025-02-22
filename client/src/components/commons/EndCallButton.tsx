import { Button } from '@chakra-ui/react/button';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useNavigate } from 'react-router-dom';

const EndCallButton = () => {
  const call = useCall();
  const navigate = useNavigate();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.'
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    navigate('/');
  };

  return (
    <Button
      onClick={endCall}
      bg={'red.500'}
      _hover={{ borderColor: 'red.500' }}
      truncate
      size={{ base: 'xs' }}
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
