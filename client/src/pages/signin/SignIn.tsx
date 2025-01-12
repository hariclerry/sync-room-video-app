import { SignIn } from '@clerk/clerk-react';
import { Text, Flex } from '@chakra-ui/react';

import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
    <Flex marginTop="20" justifyContent={'center'} position={'relative'}>
      <SignIn></SignIn>
      <Text mt={4} textAlign="center" position={'absolute'} bottom={86}>
        Don’t have an account?{' '}
        <Link to="/sign-up" style={{ color: 'green' }}>
          Sign up
        </Link>
      </Text>
    </Flex>
  );
};
export default CustomSignIn;
