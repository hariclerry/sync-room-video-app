import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { AvatarGroup, Avatar } from '../ui/avatar';
import { toaster } from '../ui/toaster';
import { FaCopy } from 'react-icons/fa';
import { avatarBgColors, dummyParticipantAvatars } from '../commons/constants';

interface MeetingCardProps {
  icon: React.ReactElement;
  title: string;
  date: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: React.ReactElement;
  buttonText?: string;
  handleClick?: () => void;
  link: string;
  recordingLink?: string;
}

const MAX_VISIBLE_AVATARS = 4;

const MeetingCard: React.FC<MeetingCardProps> = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link,
  recordingLink,
}) => {
  return (
    <Box
      bg="#222529"
      borderRadius={'2xl'}
      padding={4}
      boxShadow="sm"
      flex="1"
      minW="300px"
      maxW="100%"
    >
      <Flex mb="4">{icon}</Flex>

      <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }} mb="2">
        {title}
      </Text>

      <Text fontSize="sm" color="gray.500" fontStyle={'normal'}>
        {date}
      </Text>

      <Flex
        justify="space-between"
        align="center"
        gap={8}
        wrap={'wrap'}
        mb={{ md: '4', base: '2' }}
        mt={{ base: 10, md: 12 }}
      >
        {dummyParticipantAvatars && dummyParticipantAvatars.length > 0 && (
          <AvatarGroup size={{ base: 'xs', md: 'sm' }}>
            {dummyParticipantAvatars
              .slice(0, MAX_VISIBLE_AVATARS)
              .map((participant, index) => (
                <Avatar
                  key={participant.id}
                  name={participant.name}
                  bg={avatarBgColors[index % avatarBgColors.length]}
                  border={'none'}
                  color={'#fff'}
                />
              ))}
            <Avatar
              fallback={`${MAX_VISIBLE_AVATARS}+`}
              bg={'#252A41'}
              color={'#fff'}
              border={'none'}
            />
          </AvatarGroup>
        )}
        {!isPreviousMeeting && (
          <Flex gap={{ md: '2', base: '4' }} wrap={'wrap'}>
            <Button
              bg="green"
              onClick={handleClick}
              minWidth="80px"
              flexShrink={0}
              border={'none'}
              size={{ md: 'sm', base: 'xs' }}
              fontSize={{ base: 'xs', md: 'xl' }}
              _hover={{
                border: 'none',
              }}
              cursor={'pointer'}
            >
              {buttonIcon1 && buttonIcon1 ? (
                <a
                  href={recordingLink}
                  target="_blank"
                  style={{
                    color: 'white',
                    backgroundColor: 'none',
                  }}
                >
                  <HStack>
                    {buttonIcon1} {buttonText}
                  </HStack>
                </a>
              ) : (
                buttonText
              )}
            </Button>
            <Button
              minWidth="80px"
              flexShrink={0}
              border={'none'}
              cursor={'pointer'}
              size={{ md: 'sm', base: 'xs' }}
              fontSize={{ base: 'xs', md: 'xl' }}
              _hover={{
                border: 'none',
              }}
              bg="#1a1a1a"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toaster.success({
                  title: 'Link Copied',
                });
              }}
            >
              <FaCopy />
              &nbsp; Copy Link
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default MeetingCard;
