import { Box, Flex, HStack } from '@chakra-ui/react';
import { SignedIn, UserButton } from '@clerk/clerk-react';
import { IoVideocamOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      // as="nav"
      // color="#e4ebe4"
      // bg="gray.900"
      // w="100%"
      // p="4"
      // position="fixed"
      // top="0"
      // left="0"
      // zIndex="1000"
    >
      <HStack left={{ base: '0', md: '4' }}>
        {' '}
        <IoVideocamOutline size="45" color="#119220" /> RoomSync
      </HStack>

      <Flex justify="space-between" align="center" gap="6">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Flex>
    </Box>
  );
};

export default Navbar;
