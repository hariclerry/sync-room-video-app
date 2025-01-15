import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/react-router';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { elements } from './components/commons/clerkAuthStyle.ts';
import { BrowserRouter } from 'react-router-dom';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/sign-in"
        appearance={{
          layout: {
            socialButtonsVariant: 'iconButton',
            logoImageUrl: '/cam-recorder.png',
          },
          elements,
          variables: {
            colorText: '#eae2e2',
            colorPrimary: '#106107',
            colorBackground: '#272931',
            colorInputBackground: '#18181b',
            colorInputText: '#eae2e2',
          },
        }}
      >
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
