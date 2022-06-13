import { Box, Button, TextInput } from '@react-native-material/core';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = async () => {
    await signIn({ email, password });
  };

  return (
    <Box
      w={'100%'}
      h={'100%'}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
      }}
    >
      <TextInput
        variant="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ width: '100%', marginVertical: 16 }}
      />
      <TextInput
        variant="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={{ width: '100%', marginVertical: 16 }}
      />
      <Button
        variant="contained"
        title="Entrar"
        onPress={handleSubmit}
        style={{ width: '100%', marginVertical: 16 }}
      />
    </Box>
  );
};

export default SignIn;
