import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  View,
  DeviceEventEmitter,
  Platform,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Beacons from 'react-native-beacons-manager';
import Container from '../components/Container';
import { sites } from '../config/data';

// var disabled = false

class NearbyAndroid extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      uuidRef: '01122334-4556-6778-899a-abbccddeeff0',
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    Beacons.detectIBeacons();

    const uuid = this.state.uuidRef;
    Beacons.startRangingBeaconsInRegion('REGION1', uuid)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
  }

  componentDidMount() {
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      if (data.beacons !== null) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons),
        });
      }
    });
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  render() {
    const { dataSource } = this.state;

    if (dataSource.getRowCount() === 0) {
      return (
        <Text style={styles.headline}>
          Find nearest beacons to get information about a campus location
        </Text>
      );
    }

    return (
      <ListView
        dataSource={dataSource}
        enableEmptySections
        renderRow={beacon => this.renderBeaconRow(beacon)}
      />
    );
  }

  renderBeaconRow(beacon) {
    const beaconID = beacon.major;
    let site = null;

    // check if the detected beacon is from one of our beacons
    sites.forEach((item) => {
      if (beaconID === item.major) {
        return (site = item);
      }
    });

    if (site === null) {
      return (
        <Text style={styles.headline}>The detected beacon is not from one of our beacons!</Text>
      );
    }

    return (
      <Container>
        <Tile imageSrc={{ uri: site.picture }} featured title={site.name} caption={site.address} />

        <Container style={{ flex: 1, backgroundColor: 'lightskyblue' }}>
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

        <Container style={{ flex: 1, backgroundColor: 'lightskyblue' }}>
          <Text> Info </Text>
        </Container>

        <Text>
          {site.info}
        </Text>
      </Container>
    );
  }

  handleCheckinPress = () => {
    this.props.navigation.navigate('Feedback');
  };
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
  },
});

module.exports = NearbyAndroid;

// <Button
//    title="Unlock Achievement"
//    buttonStyle={{ marginTop: 20 }}
//    disabled={disabled}
//    onPress={ !disabled && this.handleCheckinPress }
// />
