import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    letterSpacing: -0.5,
    marginTop: 20,
    paddingHorizontal: 20,
    color: '#de737b',
  },
});

const Logo = () =>
  <View style={styles.container}>
    <Icon name="gps-fixed" size={200} color={'#de737b'} />
    <Text style={styles.text}>Welcome to TU Delft!</Text>
    <Text style={styles.text}>Explore the campus to get more information!</Text>
  </View>;

export default Logo;
