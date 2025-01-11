import { Box, Input, Text } from '@chakra-ui/react';

const FormInput = ({
  label,
  type = 'text',
  height,
}: {
  label: string;
  type: string;
  height?: number;
}) => {
  return (
    <Box>
      <Text pb={2}> {label} </Text>
      <Input name="description" type={type} height={height} />
    </Box>
  );
};

export default FormInput;
