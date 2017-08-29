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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Tile } from 'react-native-elements';
import Beacons from 'react-native-beacons-manager';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import Analytics from 'react-native-firebase-analytics';
import Logo from '../components/Logo';
import Container from '../components/Container';
import BeaconInfo from '../components/BeaconInfo';
import { unlockAchievementIfBeaconDetected, addToUser, addToLogger } from '../actions/achievements';

const sticker1 = require('./images/sticker1.png');
const sticker2 = require('./images/sticker2.png');
const sticker3 = require('./images/sticker3.png');
const sticker4 = require('./images/sticker4.png');
const sticker5 = require('./images/sticker5.png');
const sticker6 = require('./images/sticker6.png');
const sticker7 = require('./images/sticker7.png');
const sticker8 = require('./images/sticker8.png');
const sticker9 = require('./images/sticker9.png');
const sticker10 = require('./images/sticker10.png');
const sticker11 = require('./images/sticker11.png');
const sticker12 = require('./images/sticker12.png');
const sticker13 = require('./images/sticker13.png');
const io = require('./images/io.jpg');
const me = require('./images/3me.jpg');
const ewi = require('./images/ewi.jpg');
const aula = require('./images/aula.jpg');
const library = require('./images/library.jpg');
const civil = require('./images/civil.jpg');
const appliedsciences = require('./images/appliedsciences.jpg');
const cio = require('./images/cio.jpg');
const noimage = require('./images/noimage.jpg');

const deviceUniqueId = DeviceInfo.getUniqueID();
const deviceManufacturer = DeviceInfo.getManufacturer();
const deviceName = DeviceInfo.getSystemName();
const deviceVersion = DeviceInfo.getSystemVersion();

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
  static propTypes = {
    dispatch: PropTypes.func,
    result: PropTypes.object,
    beacon: PropTypes.object,
    count: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      uuidRef: 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAA',
      dataSource: ds.cloneWithRows([]),
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
    if (process.environment === 'staging') {
      Analytics.setEnabled(false);
    }
    Analytics.setScreenName('NearMe');
    Analytics.logEvent('visiting_nearme_screen', {
      visiting_nearme_screen: 'NearMe',
    });
    Analytics.setUserId(deviceUniqueId);
    Analytics.setUserProperty('user_id', deviceUniqueId);
    Analytics.setUserProperty('device_manufacturer', deviceManufacturer);
    Analytics.setUserProperty('device_name', deviceName);
    Analytics.setUserProperty('device_version', deviceVersion);

    this.props.dispatch(addToUser(deviceUniqueId, deviceManufacturer, deviceName, deviceVersion));
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log(data.beacons);
      if (data.beacons != null) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons),
        });
        if (data.beacons[0] != null) {
          this.props.dispatch(unlockAchievementIfBeaconDetected(data.beacons[0]));
        }
      }
    });

    // log usage data every 10 seconds
    this.logInfo = setInterval(
      () =>
        this.props.dispatch(
          addToLogger(deviceUniqueId, moment().format(), this.props.beacon, this.props.count),
        ),
      10000,
    );
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
    clearInterval(this.logInfo);
  }

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  renderBeaconRow(beacon) {
    item = this.props.result;
    let pictureSource = noimage;
    let imageSource = noimage;
    if (item && item.picture && item.picture.length > 0) {
      switch (item.picture) {
        case 'io':
          pictureSource = io;
          break;
        case 'me':
          pictureSource = me;
          break;
        case 'ewi':
          pictureSource = ewi;
          break;
        case 'aula':
          pictureSource = aula;
          break;
        case 'library':
          pictureSource = library;
          break;
        case 'civil':
          pictureSource = civil;
          break;
        case 'appliedsciences':
          pictureSource = appliedsciences;
          break;
        case 'cio':
          pictureSource = cio;
          break;
        default:
          pictureSource = noimage;
      }

      if (item && item.image && item.image.length > 0) {
        switch (item.image) {
          case 'sticker1':
            imageSource = sticker1;
            break;
          case 'sticker2':
            imageSource = sticker2;
            break;
          case 'sticker3':
            imageSource = sticker3;
            break;
          case 'sticker4':
            imageSource = sticker4;
            break;
          case 'sticker5':
            imageSource = sticker5;
            break;
          case 'sticker6':
            imageSource = sticker6;
            break;
          case 'sticker7':
            imageSource = sticker7;
            break;
          case 'sticker8':
            imageSource = sticker8;
            break;
          case 'sticker9':
            imageSource = sticker9;
            break;
          case 'sticker10':
            imageSource = sticker10;
            break;
          case 'sticker11':
            imageSource = sticker11;
            break;
          case 'sticker12':
            imageSource = sticker12;
            break;
          case 'sticker13':
            imageSource = sticker13;
            break;
          default:
            imageSource = noimage;
        }
      }
    }
    return (
      <View>
        {item
          ? <View>
            {item.picture && item.picture.length > 0
                ? <Tile
                  activeOpacity={1}
                  imageSrc={pictureSource}
                  featured
                  title={item.name || ''}
                />
                : <Tile activeOpacity={1} imageSrc={noimage} featured title={item.name || ''} />}
            <Container style={{ backgroundColor: 'lightskyblue' }}>
              <Text>Address</Text>
            </Container>
            <Text>
              {`Gebouw ${item.locatieCode ? item.locatieCode : ''}, ${item.address.straat
                  ? item.address.straat
                  : ''} ${item.address.huisnummer ? item.address.huisnummer : ''}, ${item.address
                  .postcode
                  ? item.address.postcode
                  : ''} Delft`}
            </Text>
            <Container style={{ backgroundColor: 'lightskyblue' }}>
              <Text>Description</Text>
            </Container>
            <Text>
              {item.info || ''}
            </Text>
            <BeaconInfo beacon={beacon} />
            {
              <Modal
                isVisible={this.state.isModalVisible && item.isUnlocked}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                style={styles.bottomModal}
              >
                <View style={styles.modalContent}>
                  <View style={{ height: 120, margin: 10 }}>
                    <Image
                      source={imageSource || noimage}
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
              </Modal>
              }
          </View>
          : <Text>Retrieving information...</Text>}
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  achievements: state.achievements.achievements,
  count: state.achievements.count,
  result: state.achievements.result,
  beacon: state.achievements.beacon,
});

export default connect(mapStateToProps)(NearbyAndroid);
