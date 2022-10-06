import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { NavigationContainer } from '@react-navigation/native';

import theme from './src/global/styles/theme';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/hooks/auth';
import Routes from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();

  if(!fontsLoaded || userStorageLoading)
    return null;

  return (
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
  );
}