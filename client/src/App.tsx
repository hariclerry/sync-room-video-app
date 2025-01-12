import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { Suspense } from 'react';
import { SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Toaster } from './components/ui/toaster';
// import {
//   Home,
//   Upcoming,
//   Previous,
//   Recordings,
//   PersonalRoom,
//   Meeting,
//   CustomSignIn,
//   CustomSignUp,
//   Layout,
//   MinimalLayout,
// } from './pages/lazyImports';
import AppWithStreamVideoProvider from './components/ProtectedRoute/ProtectedRoute';
import CustomSignIn from './pages/signin/SignIn';
import CustomSignUp from './pages/signup/SignUp';
import Layout from './pages/Layout';
import Home from './pages/home/Home';
import Upcoming from './pages/upcoming/Upcoming';
import Recordings from './pages/recordings/Recordings';
import Previous from './pages/previous/Previous';
import PersonalRoom from './pages/room/PersonalRoom';
import { MinimalLayout } from './pages/lazyImports';
import Meeting from './pages/meeting/Meeting';

const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: (
      // <Suspense fallback={<div>Loading...</div>}>
      <CustomSignIn />
      // </Suspense>
    ),
  },
  {
    path: '/sign-up',
    element: (
      // <Suspense fallback={<div>Loading...</div>}>
      <CustomSignUp />
      // </Suspense>
    ),
  },

  // Protected Routes
  {
    path: '/',
    element: <AppWithStreamVideoProvider />,
    children: [
      {
        path: '/',
        element: (
          // <Suspense fallback={<div>Loading...</div>}>
          <Layout />
          // </Suspense>
        ),
        children: [
          { index: true, element: <Home /> },
          { path: 'upcoming', element: <Upcoming /> },
          { path: 'previous', element: <Previous /> },
          { path: 'recordings', element: <Recordings /> },
          { path: 'personal', element: <PersonalRoom /> },
        ],
      },
      {
        path: 'meeting/:id',
        element: (
          // <Suspense fallback={<div>Loading...</div>}>
          <MinimalLayout />
          // </Suspense>
        ),
        children: [{ index: true, element: <Meeting /> }],
      },
    ],
  },

  // Catch-all route for unauthorized access
  {
    path: '*',
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
