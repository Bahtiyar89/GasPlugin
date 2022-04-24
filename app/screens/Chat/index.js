import React, { useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';

const ChatScreen = props => {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;

  return (
    <>
      {isSigned ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>В разработке !</Text>
        </View>
      ) : (
        <Login navigation={navigation} />
      )}
    </>
  );
};

export default ChatScreen;
