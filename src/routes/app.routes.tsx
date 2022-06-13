import { Icon, IconButton } from '@react-native-material/core';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import Form from '../views/Form';
import Home from '../views/Home';
import { View } from 'react-native';
import Details from '../views/Details';

const AppStack = createStackNavigator();

export const AppRoutes: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <AppStack.Navigator
      screenOptions={{
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            {/* <IconButton
              onPress={() => queryClient.invalidateQueries('patients:all')}
              icon={(props) => <Icon name="reload" {...props} />}
            /> */}
            <IconButton
              onPress={signOut}
              icon={(props) => <Icon name="logout" {...props} />}
            />
          </View>
        ),
      }}
    >
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Dashboard' }}
      />
      <AppStack.Screen
        name="Form"
        component={Form}
        options={{ title: 'Formulario' }}
      />
      <AppStack.Screen
        name="Details"
        component={Details}
        options={{ title: 'Detalhes do Paciente' }}
      />
    </AppStack.Navigator>
  );
};
