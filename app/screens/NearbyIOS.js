import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  ScrollView,
  DeviceEventEmitter,
  Platform,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Beacons from 'react-native-beacons-manager';
import Container from '../components/Container';
import { venues } from '../config/data';

const disabled = false;

class NearbyIOS extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      identifier: 'Apple Inc,.',
      uuid: '01122334-4556-6778-899a-abbccddeeff0',
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    Beacons.requestWhenInUseAuthorization();

    const region = {
      identifier: this.state.identifier,
      uuid: this.state.uuid,
    };

    Beacons.startRangingBeaconsInRegion(region);
    Beacons.startUpdatingLocation();
  }

  componentDidMount() {
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      if (data.beacons != null) {
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

    return (
      <Container>
        <Text style={styles.headline}>
          Find nearest beacons to get information about a location
        </Text>
        <ListView
          dataSource={dataSource}
          enableEmptySections
          renderRow={beacon => this._renderBeaconRow(beacon)}
        />
      </Container>
    );
  }

  _renderBeaconRow(beacon) {
    const key = beacon.major;
    let venue;
    venues.forEach((item) => {
      if (item.major === key) {
        return (venue = item);
      }
    });

    return (
      <Container>
        <Tile
          imageSrc={{ uri: venue.picture }}
          featured
          title={venue.name}
          caption={venue.address}
        />

        <Button
          title="Unlock Achievement"
          buttonStyle={{ marginTop: 20 }}
          disabled={disabled}
          onPress={!disabled && this._handleCheckinPress}
        />

        <Container style={{ backgroundColor: 'lightskyblue' }}>
          <Text> Beacon </Text>
        </Container>

        <Text>
          {' '}UUID: {beacon.uuid ? beacon.uuid : 'NA'}{' '}
        </Text>
        <Text>
          {' '}Major: {beacon.major ? beacon.major : 'NA'}{' '}
        </Text>
        <Text>
          {' '}Minor: {beacon.minor ? beacon.minor : 'NA'}{' '}
        </Text>
        <Text>
          {' '}RSSI: {beacon.rssi ? beacon.rssi : 'NA'}{' '}
        </Text>
        <Text>
          {' '}Proximity: {beacon.proximity ? beacon.proximity : 'NA'}{' '}
        </Text>
        <Text>
          {' '}Distance: {beacon.accuracy ? beacon.accuracy.toFixed(2) : 'NA'}m{' '}
        </Text>

        <Container style={{ backgroundColor: 'lightskyblue' }}>
          <Text> Info </Text>
        </Container>

        <Text>
          {' '}{venue.info}{' '}
        </Text>
      </Container>
    );
  }

  _handleCheckinPress = () => {
    this.props.navigation.navigate('Feedback');
  };
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
  },
});

module.exports = NearbyIOS;
