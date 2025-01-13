import { SignIn } from '@clerk/react-router';
import { Flex } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';

const CustomSignIn = () => {
  const location = useLocation();
  const redirectTo = location.state?.from.path || '/';

  return (
    <Flex marginTop="20" justifyContent={'center'} position={'relative'}>
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={redirectTo} //
      ></SignIn>
    </Flex>
  );
};
export default CustomSignIn;
