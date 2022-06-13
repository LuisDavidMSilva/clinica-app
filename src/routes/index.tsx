import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export const Routes = () => {
  const { isAuthenticated, loading } = useAuth();

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};
