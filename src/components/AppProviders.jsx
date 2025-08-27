import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export function AppProviders({ children }) {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
        colors: {
          primary: ['#667eea'],
          secondary: ['#764ba2'],
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
}
