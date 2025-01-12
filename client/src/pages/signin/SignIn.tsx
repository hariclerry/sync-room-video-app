import { SignIn } from '@clerk/clerk-react';
import { Flex } from '@chakra-ui/react';

const CustomSignIn = () => {
  const signUpUrl = import.meta.env.VITE_CLERK_SIGN_UP_URL;

  return (
    <Flex marginTop="20" justifyContent={'center'}>
      <SignIn signUpUrl={signUpUrl} />
    </Flex>
  );
};
export default CustomSignIn;
