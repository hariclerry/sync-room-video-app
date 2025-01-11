import React, { ReactNode, useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const VideoActionsMobile = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        aria-label="Open Video Actions"
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        bottom={4}
        right={4}
        size="lg"
        rounded="full"
        bg="gray.800"
        color="white"
        _hover={{ bg: 'gray.600', borderColor: 'gray.600' }}
        zIndex={10}
      >
        <FaBars />
      </IconButton>

      {isOpen && (
        <Box
          position="fixed"
          bottom="0"
          height="120px"
          width="100vw"
          color="white"
          zIndex="999"
          padding="10px"
          boxShadow="lg"
          display={{ base: 'flex', md: 'none' }}
          flexDirection="column"
          alignItems="center"
          bg="rgb(55 52 52 / 50%)" // Semi-transparent black background
          backdropFilter="blur(5px)" // Blur effect
        >
          <Box
            position="fixed"
            right={'20px'}
            bg="#141313"
            borderRadius="full"
            padding={1}
          >
            <MdClose onClick={toggleDrawer} />
          </Box>

          {children}
        </Box>
      )}
    </>
  );
};

export default VideoActionsMobile;
