// lazyImports.js
import { lazy } from 'react';

export const Home = lazy(() => import('./home/Home'));
export const Upcoming = lazy(() => import('./upcoming/Upcoming'));
export const Previous = lazy(() => import('./previous/Previous'));
export const Recordings = lazy(() => import('./recordings/Recordings'));
export const PersonalRoom = lazy(() => import('./room/PersonalRoom'));
export const Meeting = lazy(() => import('./meeting/Meeting'));
export const CustomSignIn = lazy(() => import('./signin/SignIn'));
export const CustomSignUp = lazy(() => import('./signup/SignUp'));
export const Layout = lazy(() => import('./Layout'));
export const MinimalLayout = lazy(() => import('./MinimalLayout'));
