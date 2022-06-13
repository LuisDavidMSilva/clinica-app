import { Box, Button, Text, TextInput } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { api } from '../../libs/api';
import { queryClient } from '../../libs/queryClient';
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

const Details = ({ route: { params }, navigation: { navigate } }: any) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('MALE');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    setName(params.name);
    setCpf(params.cpf);
    setRg(params.rg);
    setPhone(params.phone);
    setEmail(params.email);
    setGender(params.gender);
    setAddress(params.address);
    setDistrict(params.district);
    setCountry(params.country);
  }, []);

  const handleSubmit = async () => {
    await api
      .put(`patients/${params.id}`, {
        name,
        cpf,
        rg,
        phone,
        email,
        gender,
        address,
        district,
        country,
      })
      .then(() => {
        queryClient.invalidateQueries('patients:all');
        navigate('Home');
      });
  };

  const handleDelete = async () => {
    await api.delete(`patients/${params.id}`).then(() => {
      queryClient.invalidateQueries('patients:all');
      navigate('Home');
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight - 50,
        position: 'relative',
      }}
    >
      <ScrollView>
        <Box
          w={'100%'}
          h={'100%'}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            variant="outlined"
            label="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ width: '100%', marginVertical: 16 }}
          />
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              variant="outlined"
              label="CPF"
              value={cpf}
              onChangeText={(text) => setCpf(text)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <TextInput
              variant="outlined"
              label="RG"
              value={rg}
              onChangeText={(text) => setRg(text)}
              style={{ flex: 1 }}
            />
          </View>
          <TextInput
            variant="outlined"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ width: '100%', marginVertical: 16 }}
          />
          <TextInput
            variant="outlined"
            label="Telefone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={{ width: '100%', marginVertical: 16 }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text variant="button">Masculino</Text>
              <RadioButton
                value="MALE"
                status={gender === 'MALE' ? 'checked' : 'unchecked'}
                onPress={() => setGender('MALE')}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text variant="button">Feminino</Text>
              <RadioButton
                value="FEMALE"
                status={gender === 'FEMALE' ? 'checked' : 'unchecked'}
                onPress={() => setGender('FEMALE')}
              />
            </View>
          </View>
          <TextInput
            variant="outlined"
            label="Endereço"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{ width: '100%', marginVertical: 16 }}
          />

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              variant="outlined"
              label="Estado"
              value={district}
              onChangeText={(text) => setDistrict(text)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <TextInput
              variant="outlined"
              label="Pais"
              value={country}
              onChangeText={(text) => setCountry(text)}
              style={{ flex: 1 }}
            />
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 8 }}>
            <Button
              variant="contained"
              title="Atualizar"
              onPress={handleSubmit}
              style={{ flex: 1, marginRight: 8, backgroundColor: '#fdcb6e' }}
            />

            <Button
              variant="contained"
              title="Excluir Registro"
              onPress={handleDelete}
              style={{ flex: 1, backgroundColor: '#ff7675' }}
            />
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
