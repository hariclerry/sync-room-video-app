import { SignUp } from '@clerk/clerk-react';
import { Flex } from '@chakra-ui/react';

function CustomSignUp() {
  // const signInUrl = import.meta.env.VITE_CLERK_SIGN_IN_URL;
  return (
    <Flex marginTop="20" justifyContent={'center'}>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </Flex>
  );
}

export default CustomSignUp;
