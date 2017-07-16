import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.08,
    borderRadius: 50,
    borderWidth: 0,
    backgroundColor: '#009688',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '100',
  },
});

const Button = ({ text, onPress }) =>
  <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {text}
    </Text>
  </TouchableOpacity>;

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default Button;
