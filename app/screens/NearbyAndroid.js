import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  DeviceEventEmitter,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { Tile } from 'react-native-elements';
import Beacons from 'react-native-beacons-manager';
import moment from 'moment';
import BeaconInfo from '../components/BeaconInfo';
import Logo from '../components/Logo';
import Container from '../components/Container';
import { achievements } from '../config/data';

const pikachu = require('./images/001.png');

let item = null;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f96062',
    padding: 12,
    marginTop: 25,
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.5,
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
      isFirstModalVisible: true,
      isModalVisible: true,
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

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };
  hideFirstModal = () => {
    this.setState({ isFirstModalVisible: false });
  };

  renderBeaconRow(beacon) {
    achievements.forEach((achievement) => {
      if (achievement.major === beacon.major) {
        achievement.isUnlocked = true;
        // console.log(achievements);
        return (item = achievement);
      }
      return item;
    });

    return (
      <View>
        {item
          ? <View>
            <Tile activeOpacity={1} imageSrc={item.picture} featured title={item.name} />
            <Container style={{ backgroundColor: 'lightskyblue' }}>
              <Text>Address</Text>
            </Container>
            <Text>
              {`Gebouw ${item.locatieCode}, ${item.address.straat} ${item.address
                  .huisnummer}, ${item.address.postcode} Delft`}
            </Text>
            <Container style={{ backgroundColor: 'lightskyblue' }}>
              <Text>Description</Text>
            </Container>
            <Text>
              {item.info}
            </Text>
            <BeaconInfo beacon={beacon} />
            {
              <Modal
                isVisible={this.state.isModalVisible}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                style={styles.bottomModal}
              >
                {item.isUnlocked
                    ? <View style={styles.modalContent}>
                      <View style={{ height: 120, margin: 10 }}>
                        <Image
                          source={item.image}
                          style={{ height: 80, width: 80, margin: 10 }}
                          resizeMode="contain"
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderBottomWidth: 1,
                            borderColor: '#e3e3e3',
                            padding: 5,
                          }}
                        >
                          <Text style={{ fontSize: 11, color: '#777' }}>
                            {item.achievementName || ''}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.text}>
                        {item.feedback || ''}
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
          : <Logo />}
      </View>
    );
  }

  render() {
    const { dataSource } = this.state;

    if (dataSource.getRowCount() === 0) {
      return (
        <Container>
          <Logo />
          <Modal
            isVisible={this.state.isFirstModalVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            style={styles.bottomModal}
          >
            <View style={styles.modalContent}>
              <View style={{ height: 120, margin: 10 }}>
                <Image
                  source={pikachu}
                  style={{ height: 80, width: 80, margin: 10 }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderBottomWidth: 1,
                    borderColor: '#e3e3e3',
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 11, color: '#777' }}>Newbie</Text>
                </View>
              </View>
              <Text style={styles.text}>
                Great! You have unlocked your first sticker! View your collection of stickers under
                the Achievements Tab. Explore the campus to collect them all!
              </Text>
              <TouchableOpacity onPress={this.hideFirstModal}>
                <View style={styles.button}>
                  <Text>Dismiss</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
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
      </View>
    );
  }
}

export default NearbyAndroid;
