import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Box } from '@react-native-material/core';
import { Provider as MaterialProvider } from '@react-native-material/core';

import { AuthProvider } from './src/contexts/auth-context';
import { queryClient } from './src/libs/queryClient';
import { Routes } from './src/routes';

import { IconComponentProvider, Icon } from '@react-native-material/core';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
  return (
    <SafeAreaProvider>
      <MaterialProvider>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <AuthProvider>
                <StatusBar style="auto" />
                <Routes />
              </AuthProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </IconComponentProvider>
      </MaterialProvider>
    </SafeAreaProvider>
  );
}
