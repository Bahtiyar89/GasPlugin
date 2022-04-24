import React, { Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

import styles from './styles';

const MainScreen = props => {
  return (
    <Fragment>
      <Appbar.Header style={styles.appBarHeader}>
        <Text style={styles.appBarHeaderText}>Map</Text>
      </Appbar.Header>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Text>main screen</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default MainScreen;
