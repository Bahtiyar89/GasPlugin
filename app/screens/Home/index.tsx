import React, { Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Portal, FAB, DefaultTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import MainScreen from '../Main';
import MyShipmentsScreen from '../MyShipment';
import ChatScreen from '../Chat';
import ProfileScreen from '../Profile';
import styles from './styles';
import I18n from '../../../i18';

const Tab = createMaterialBottomTabNavigator();

const Home: React.FC = () => {
  return (
    <Fragment>
      <Tab.Navigator
        style={{ width: 'auto' }}
        shifting={true}
        sceneAnimationEnabled={false}
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#f9f9f9' }}>
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            tabBarLabel: I18n.t('TabNav.main'),
            tabBarIcon: () => (
              <Image
                source={require('../../assets/map.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="MyShipments"
          component={MyShipmentsScreen}
          options={{
            tabBarLabel: I18n.t('TabNav.shipments'),
            tabBarIcon: () => (
              <Image
                source={require('../../assets/my_shipment.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            tabBarLabel: I18n.t('TabNav.chat'),
            tabBarIcon: () => (
              <Image
                source={require('../../assets/chat.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profilecreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: I18n.t('TabNav.profile'),
            tabBarIcon: () => (
              <Image
                source={require('../../assets/user.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </Fragment>
  );
};

export default Home;
