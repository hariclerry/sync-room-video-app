import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import StreamVideoProvider from '../../providers/StreamClientProvider';
// import StreamVideoProvider from './providers/StreamClientProvider';

const AppWithStreamVideoProvider = () => {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  console.log('User signed in-----:', isSignedIn);

  if (!isSignedIn) {
    // Redirect to sign-in, preserving the intended route in state
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return (
    <StreamVideoProvider>
      <Outlet />
    </StreamVideoProvider>
  );
};

export default AppWithStreamVideoProvider;
