import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion'; // for animations

const MotionGridItem = motion(GridItem); // Motion-enabled GridItem for animations

const ResponsiveGridLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Only show the aside on desktop (md and up)
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box p={4}>
      <Button onClick={() => setIsVisible((prev) => !prev)} mb={4}>
        {isVisible ? 'Hide Aside' : 'Show Aside'}
      </Button>

      <Grid
        templateColumns={{ base: '1fr', md: isVisible ? '3fr 1fr' : '1fr' }}
        gap={4}
        transition="all 0.3s ease-in-out" // Smooth column resizing
      >
        {/* Main Content */}
        <GridItem
          bg="gray.100"
          p={4}
          borderRadius="md"
          transition="all 0.3s ease-in-out"
        >
          <Box>Main Content</Box>
        </GridItem>

        {/* Animate the Aside Content with Framer Motion */}
        <AnimatePresence>
          {isDesktop && isVisible && (
            <MotionGridItem
              key="aside"
              bg="blue.100"
              p={4}
              borderRadius="md"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Box>Aside Content</Box>
            </MotionGridItem>
          )}
        </AnimatePresence>
      </Grid>
    </Box>
  );
};

export default ResponsiveGridLayout;
