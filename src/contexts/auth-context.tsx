import React, { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../libs/api';
import { useQuery } from 'react-query';

export type UserProps = {
  id: string;
  email: string;
  name: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type AuthContextProps = {
  isAuthenticated: boolean;
  user: UserProps | null;
  token: string | null;
  loading: boolean;
  signIn(data: SignInProps): Promise<void>;
  signOut(): Promise<void>;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLoadingData = async () => {
      const itemUser = await AsyncStorage.getItem('@RNAuth:user');
      const itemToken = await AsyncStorage.getItem('@RNAuth:token');

      if (itemUser && itemToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${itemToken}`;

        setUser(JSON.parse(itemUser));
        setToken(JSON.parse(itemToken));
        setLoading(false);
      } else {
        setUser(null);
        setToken(null);
      }
    };

    onLoadingData();
  }, [token]);

  const signIn = async ({ email, password }: SignInProps): Promise<void> => {
    const {
      data: { result },
    } = await api.post('authentication', { email, password });

    setUser(result.user);
    setToken(result.token);

    await AsyncStorage.multiSet([
      ['@RNAuth:user', JSON.stringify(result.user)],
      ['@RNAuth:token', JSON.stringify(result.token)],
    ]);

    api.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
  };

  const signOut = async (): Promise<void> => {
    await AsyncStorage.clear();

    setUser(null);
  };

  const value = {
    isAuthenticated: !!user,
    user,
    token,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
