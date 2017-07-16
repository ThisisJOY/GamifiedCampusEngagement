import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Container from './Container';

const BeaconInfo = ({ beacon }) =>
  <View>
    <Container style={{ backgroundColor: 'lightskyblue' }}>
      <Text> Beacon </Text>
    </Container>

    <Text>
      UUID: {beacon.uuid ? beacon.uuid : 'NA'}
    </Text>
    <Text>
      Major: {beacon.major ? beacon.major : 'NA'}
    </Text>
    <Text>
      Minor: {beacon.minor ? beacon.minor : 'NA'}
    </Text>
    <Text>
      RSSI: {beacon.rssi ? beacon.rssi : 'NA'}
    </Text>
    <Text>
      Proximity: {beacon.proximity ? beacon.proximity : 'NA'}
    </Text>
    <Text>
      Distance: {beacon.distance ? beacon.distance.toFixed(2) : 'NA'}m
    </Text>
  </View>;

BeaconInfo.propTypes = {
  beacon: PropTypes.object,
};

export default BeaconInfo;
