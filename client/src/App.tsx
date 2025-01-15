import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { SignedOut, RedirectToSignIn } from '@clerk/react-router';
import { Toaster } from './components/ui/toaster';
import {
  Home,
  Upcoming,
  Previous,
  Recordings,
  PersonalRoom,
  Meeting,
  CustomSignIn,
  CustomSignUp,
  Layout,
  MinimalLayout,
} from './pages/lazyImports';
import AppWithStreamVideoProvider from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/sign-in"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CustomSignIn />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CustomSignUp />
            </Suspense>
          }
        />

        {/* Protected Routes */}
        <Route path="/" element={<AppWithStreamVideoProvider />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Layout />
              </Suspense>
            }
          >
            <Route index element={<Home />} />
            <Route path="upcoming" element={<Upcoming />} />
            <Route path="previous" element={<Previous />} />
            <Route path="recordings" element={<Recordings />} />
            <Route path="personal" element={<PersonalRoom />} />
          </Route>

          <Route
            path="meeting/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MinimalLayout />
              </Suspense>
            }
          >
            <Route index element={<Meeting />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
