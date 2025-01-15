import { SignIn } from '@clerk/react-router';
import { Flex } from '@chakra-ui/react';

const CustomSignIn = () => {
  return (
    <Flex marginTop="20" justifyContent={'center'} position={'relative'}>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up"></SignIn>
    </Flex>
  );
};
export default CustomSignIn;
