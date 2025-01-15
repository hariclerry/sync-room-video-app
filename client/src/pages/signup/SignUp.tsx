import { SignUp } from '@clerk/clerk-react';
import { Flex } from '@chakra-ui/react';

function CustomSignUp() {
  return (
    <Flex marginTop="20" justifyContent={'center'}>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </Flex>
  );
}

export default CustomSignUp;
