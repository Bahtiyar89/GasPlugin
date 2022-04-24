import React, { useContext } from 'react';
import { View, Button, StatusBar, Image } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeController from '../components/ThemeController';
import AuthContext from '../context/auth/AuthContext';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import RestoreAccount from 'app/screens/RestoreAccount';
import Registration from '../screens/Registration';
import TimerController from '../components/TimerController';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Профиль',
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation

          headerRight: () => <ThemeController />,
        }}
      />

      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          title: 'Регистрация',
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation

          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => {
  return (
    <LoggedInStack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
          //headerShown: false,
          headerRight: () => <ThemeController />,
          headerLeft: () => <TimerController />,
        }}
        component={Home}
      />
    </LoggedInStack.Navigator>
  );
};

interface IProps {
  theme: Theme;
}
const Navigation: React.FC<IProps> = (props: IProps) => {
  const authContext = useContext(AuthContext);
  const { isSigned, signOut, user } = authContext;
  const { theme } = props;

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={LoggedInNavigator} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Профиль',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation

            headerRight: () => <ThemeController />,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: 'Регистрация',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation

            headerRight: () => <ThemeController />,
          }}
        />
        <Stack.Screen
          name="RestoreAccount"
          component={RestoreAccount}
          options={{
            title: 'Восстановить',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation

            headerRight: () => <ThemeController />,
          }}
        />
        {/* isSigned ? (
          <Stack.Screen name="Home" component={LoggedInNavigator} />
        ) : (
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isSigned ? 'push' : 'pop',
              headerRight: () => <ThemeController />,
            }}
          />
          )*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
