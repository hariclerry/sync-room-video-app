import { SignUp } from '@clerk/clerk-react';
import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function CustomSignUp() {
  return (
    <Flex marginTop="20" justifyContent={'center'}>
      <SignUp />
      <Text mt={4} textAlign="center" position={'absolute'} bottom={'245px'}>
        Have an account?{' '}
        <Link to="/sign-in" style={{ color: 'green' }}>
          Sign in
        </Link>
      </Text>
    </Flex>
  );
}

export default CustomSignUp;
