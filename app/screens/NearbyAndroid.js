import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { Tile } from 'react-native-elements';
import Beacons from 'react-native-beacons-manager';
import BeaconInfo from '../components/BeaconInfo';
import Logo from '../components/Logo';
import Container from '../components/Container';

import { achievements } from '../config/data';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f96062',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

class NearbyAndroid extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      uuidRef: '01122334-4556-6778-899a-abbccddeeff0',
      dataSource: ds.cloneWithRows([]),
      isModalVisible: false,
      result: null,
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

  hideModal = () => this.setState({ isModalVisible: false });

  renderBeaconRow(beacon) {
    // check if the detected beacon is one of our beacons
    achievements.forEach((achievement) => {
      // achievement.isUnlocked = false;
      if (beacon.major === achievement.major) {
        achievement.isUnlocked = true;
        return this.setState({ result: achievement, isModalVisible: true });
      }
    });

    return (
      <View>
        <Tile
          activeOpacity={1}
          imageSrc={this.state.result.picture ? this.state.result.picture : null}
          featured
          title={this.state.result.name ? this.state.result.name : null}
        />
        <Container style={{ backgroundColor: 'lightskyblue' }}>
          <Text>Address</Text>
        </Container>
        <Text>
          {`Gebouw ${this.state.result.locatieCode ? this.state.result.locatieCode : null}, ${this
            .state.result.address.straat
            ? this.state.result.address.straat
            : null} ${this.state.result.address.huisnummer
            ? this.state.result.address.huisnummer
            : null}, ${this.state.result.address.postcode
            ? this.state.result.address.postcode
            : null} Delft`}
        </Text>
        <Container style={{ backgroundColor: 'lightskyblue' }}>
          <Text>Description</Text>
        </Container>
        <Text>
          {this.state.result.info ? this.state.result.info : null}
        </Text>

        <BeaconInfo beacon={beacon} />
      </View>
    );
  }

  render() {
    const { dataSource } = this.state;

    if (dataSource.getRowCount() === 0) {
      return (
        <Container>
          <Logo />
        </Container>
      );
    }

    return (
      <View>
        <ListView
          dataSource={dataSource}
          enableEmptySections
          renderRow={beacon => this.renderBeaconRow(beacon)}
        />
        {
          <Modal
            isVisible={this.state.isModalVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
            {this.state.result && this.state.result.isUnlocked
              ? <View style={styles.modalContent}>
                <Text>
                  {this.state.feedback ? this.state.feedback : ''}
                </Text>
                <TouchableOpacity onPress={this.hideModal}>
                  <View style={styles.button}>
                    <Text>Dismiss</Text>
                  </View>
                </TouchableOpacity>
              </View>
              : null}
          </Modal>
        }
      </View>
    );
  }
}

export default NearbyAndroid;

// <Tile
//   imageSrc={this.state.result.picture}
//   featured
//   title={this.state.result.name}
//   caption={`Gebouw ${this.state.result.locatieCode}, ${this.state.result.address
//     .straat} ${this.state.result.address.huisnummer}, ${this.state.result.address
//     .postcode} Delft`}
// />
