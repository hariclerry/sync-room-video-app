import { SignIn } from '@clerk/clerk-react';
import { Flex } from '@chakra-ui/react';

import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const CustomSignIn = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSignedIn) {
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [isSignedIn, navigate, location.state]);

  return (
    <Flex marginTop="20" justifyContent={'center'}>
      <SignIn signUpUrl="/sign-up" />
    </Flex>
  );
};
export default CustomSignIn;
