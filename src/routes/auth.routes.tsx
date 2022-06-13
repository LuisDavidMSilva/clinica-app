import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../views/Signin';

const AuthStack = createStackNavigator();

export const AuthRoutes = () => <SignIn />;
