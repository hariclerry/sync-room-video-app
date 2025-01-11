// components/Sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { content } from '../commons/constants';
import { useLocation } from 'react-router-dom';
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from '../ui/drawer';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Open Menu"
        display={{ base: 'block', md: 'none' }}
        onClick={() => setOpen(true)}
        position="fixed"
        right="4rem"
        top="0.7rem"
        zIndex="1000"
        background="none"
        border={'none'}
        _hover={{ borderColor: 'none', backgroundColor: 'none' }}
        _focusVisible={{
          background: 'none',
        }}
      >
        <FiMenu />
      </IconButton>

      {/* Sidebar for larger screens */}
      <Box display={{ base: 'none', md: 'block' }}>
        <SidebarContent />
      </Box>

      {/* Drawer for smaller screens */}
      <DrawerRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement={'start'}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerCloseTrigger
            onClick={() => setOpen(false)}
            alignSelf="flex-end"
            m="4"
            color={'white'}
          />
          <Box
            pt={16}
            bg="gray.800"
            color="white"
            // w="250px"
            h="100%"
            // width={{ base: '100vw' }}
          >
            <SidebarContent />
          </Box>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

// Sidebar content
const SidebarContent = () => {
  const location = useLocation();

  return (
    <VStack
      align="flex-start"
      gap={{ base: 2, md: 4, lg: 4 }}
      w={{ base: '100vw' }}
    >
      {content.map((item, idx) => {
        const isActive = location.pathname === item.link;
        return (
          <Link
            to={item.link}
            key={12 + idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#ced6ce',
              padding: '10px',
              backgroundColor: isActive ? '#106107' : '',
              borderRadius: '4px',
              fontWeight: isActive ? 'bold' : 'normal',
              width: '225px',
            }}
          >
            <item.icon size={30} />
            {item.title}
          </Link>
        );
      })}
    </VStack>
  );
};

export default Sidebar;
