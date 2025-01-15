import { SignUp } from '@clerk/clerk-react';
import { Flex } from '@chakra-ui/react';

function CustomSignUp() {
  return (
    <Flex marginTop="20" justifyContent={'center'}>
      <SignUp signInUrl="/sign-in" />
    </Flex>
  );
}

export default CustomSignUp;
