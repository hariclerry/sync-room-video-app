import { SignIn, useAuth } from '@clerk/clerk-react';
import { Flex } from '@chakra-ui/react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CustomSignIn = () => {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [isSignedIn, navigate, location.state]);

  return (
    <Flex marginTop="20" justifyContent={'center'} position={'relative'}>
      <SignIn signUpUrl="/sign-up" />
    </Flex>
  );
};
export default CustomSignIn;
