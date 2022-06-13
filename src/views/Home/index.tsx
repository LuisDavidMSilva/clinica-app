import { IconButton, ListItem, Stack } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { api } from '../../libs/api';
import { useAxios } from '../../hooks/useAxios';
import { useQuery } from 'react-query';

type PatientProps = {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  district: string;
  country: string;
};

const Home = ({ navigation: { navigate } }: any) => {
  const { data: patients } = useQuery<PatientProps[]>(
    'patients:all',
    async () => {
      const response = await api.get('patients');

      return response.data;
    },
    {
      staleTime: 1000 * 10, // 10s
    }
  );

  function handleNavigationForm() {
    navigate('Form');
  }

  async function handleNavigationDetails(params: any = {}) {
    navigate('Details', params);
  }

  return (
    <>
      {/* Main */}
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight - 50,
          position: 'relative',
        }}
      >
        <ScrollView>
          {patients?.map((patient) => (
            <ListItem
              key={patient.id}
              title={`${patient.name} ( Telefone: ${patient.phone} )`}
              leading={<Icon name="account" size={24} />}
              trailing={(props) => <Icon name="chevron-right" {...props} />}
              secondaryText={`Endereço: ${patient.address} | ${patient.district} ${patient.country}`}
              onPress={() => handleNavigationDetails(patient)}
            />
          ))}
        </ScrollView>
        <Stack
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1,
            position: 'absolute',
            left: '80%',
            top: '85%',
          }}
        >
          <IconButton
            onPress={handleNavigationForm}
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#0984e3',
            }}
            color="white"
            icon={(props) => <Icon name="plus" {...props} />}
          />
        </Stack>
      </SafeAreaView>

      {/* Footer */}
    </>
  );
};

export default Home;
