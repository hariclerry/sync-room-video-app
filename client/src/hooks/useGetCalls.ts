import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/clerk-react';

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      
      setIsLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now
  })
  
  // Improve
  const todaysCalls = 
  calls?.filter(({ state: { startsAt } }: Call) => {
    let callDate = '';
    const nowDate =
      now.getDate().toString() +
      '/' +
      now.getMonth().toString() +
      '/' +
      now.getFullYear().toString();
    if (startsAt) {
      callDate =
        startsAt?.getDate().toString() +
        '/' +
        startsAt?.getMonth().toString() +
        '/' +
        startsAt?.getFullYear().toString();
    }
    return callDate === nowDate;
  }).slice(0, 2);

  return { todaysCalls, endedCalls, upcomingCalls, callRecordings: calls, isLoading }
};