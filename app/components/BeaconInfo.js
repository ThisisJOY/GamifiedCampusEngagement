import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Platform } from 'react-native';
import Container from './Container';

const BeaconInfo = ({ beacon }) =>
  <View>
    <Container style={{ backgroundColor: 'lightskyblue' }}>
      <Text> Beacon </Text>
    </Container>

    <Text>
      UUID: {beacon.uuid || 'NA'}
    </Text>
    <Text>
      Major: {beacon.major || 'NA'}
    </Text>
    <Text>
      Minor: {beacon.minor || 'NA'}
    </Text>
    <Text>
      RSSI: {beacon.rssi || 'NA'}
    </Text>
    <Text>
      Proximity: {beacon.proximity || 'NA'}
    </Text>
    <Text>
      {Platform.OS === 'ios'
        ? <Text>
            Distance: {beacon.accuracy ? beacon.accuracy.toFixed(2) : 'NA'}m
          </Text>
        : <Text>
            Distance: {beacon.distance ? beacon.distance.toFixed(2) : 'NA'}m
          </Text>}
    </Text>
  </View>;

BeaconInfo.propTypes = {
  beacon: PropTypes.object,
};

export default BeaconInfo;
