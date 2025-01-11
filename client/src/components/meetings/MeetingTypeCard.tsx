import React from 'react';
import { Box, Text, Flex, BoxProps } from '@chakra-ui/react';

interface ReusableCardProps extends BoxProps {
  icon: React.ReactElement; // Pass the icon directly as a React element
  title: string;
  description: string;
  bgColor?: string;
  onClick?: () => void;
}

const MeetingTypeCard: React.FC<ReusableCardProps> = ({
  icon,
  title,
  description,
  bgColor = 'gray.200',
  onClick,
  ...boxProps
}) => {
  return (
    <Box
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
      p={4}
      gap={{ base: 2, md: 6 }}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      w="100%"
      cursor={'pointer'}
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
      }}
      onClick={onClick}
      {...boxProps}
    >
      <Flex mb={4}>{icon}</Flex>

      {/* Spacer for Flexible Layout */}
      <Box flexGrow={1}></Box>
      <Flex direction="column" mt={4}>
        <Text fontSize={{ base: 'lg', md: 'md' }} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="#fff">
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

export default MeetingTypeCard;
