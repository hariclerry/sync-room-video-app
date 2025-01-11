import { useUser } from '@clerk/clerk-react';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { generateToken } from '../api/api';
import { Spinner } from '@chakra-ui/react';

const apiKey = import.meta.env.VITE_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [token, setToken] = useState('');

  const { user, isLoaded } = useUser();

  useEffect(() => {
    const getToken = async () => {
      const token = await generateToken(user?.id);
      setToken(token.token);
      return token;
    };

    getToken();
  }, [user?.id]);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error('Stream API key missing!');

    const client = new StreamVideoClient({
      apiKey,
      token,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
    });

    setVideoClient(client);
  }, [user, isLoaded, token]);

  if (!videoClient) return <Spinner size="xl" />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
