import { Box, Text, Stack, VStack, HStack } from '@chakra-ui/react';

const CardWithBackgroundImage = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(now);
  return (
    <Box
      w="100%"
      mx="auto"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      position="relative"
      // p={4}
      marginX={5}
      color="white"
      height={{ base: '225px', md: '330px' }}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundImage="url('/home-bg2.jpg')"
        backgroundPosition="top"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        filter="blur(1px)"
        zIndex="0"
      />

      <Box position="relative" zIndex="1" p={6} borderRadius="md">
        <HStack
          gap={{ md: 36, base: 12 }}
          align="start"
          justifyContent="space-between"
          flexDirection={'column'}
        >
          <Text fontSize={{ base: 'lg', md: 'xl' }} className="glassy-bg">
            Upcoming Meeting at: 12:30 PM
          </Text>
          <Stack gap={{ md: 4, base: 2 }} align="start">
            <VStack flexDirection={'row'} alignItems={'baseline'}>
              <Text as="h1">{`${time.slice(0, time.length - 2)}`}</Text>
              <Text as="p">{`${time.slice(-2)}`}</Text>
            </VStack>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="#c9ddff">
              {`${date}`}
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Box>
  );
};

export default CardWithBackgroundImage;
