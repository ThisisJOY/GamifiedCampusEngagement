import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E2E2E2',
    height: StyleSheet.hairlineWidth,
  },
});

const Separator = () => <View style={styles.separator} />;

export default Separator;
