import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Container = props =>
  <View style={[styles.Container, props.style || {}]}>
    {props.children}
  </View>;

Container.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export default Container;
