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
import BeaconInfo from '../components/BeaconInfo';
import Logo from '../components/Logo';
import Container from '../components/Container';
import { unlockAchievementIfBeaconDetected, addToUser, addToLogger } from '../actions/achievements';

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
    achievements: PropTypes.array,
    count: PropTypes.number,
  };

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
    if (process.environment === 'staging') {
      Analytics.setEnabled(false);
    }
    Analytics.setScreenName('Near Me');
    Analytics.setUserId(deviceUniqueId);
    Analytics.setUserProperty('device_manufacturer', deviceManufacturer);
    Analytics.setUserProperty('device_name', deviceName);
    Analytics.setUserProperty('device_version', deviceVersion);

    Beacons.detectIBeacons();

    const uuid = this.state.uuidRef;
    Beacons.startRangingBeaconsInRegion('REGION1', uuid)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
  }

  componentDidMount() {
    this.props.dispatch(addToUser(deviceUniqueId, deviceManufacturer, deviceName, deviceVersion));
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      if (data.beacons != null) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons),
        });
        if (data.beacons[0] != null) {
          this.props.dispatch(unlockAchievementIfBeaconDetected(data.beacons[0]));
        }
      }
    });

    setInterval(
      () =>
        Analytics.logEvent('beacon_detected', {
          // beacon_uuid: this.props.beacon.uuid,
          // beacon_major: this.props.beacon.major,
          // beacon_minor: this.props.beacon.minor,
          // beacon_rssi: this.props.beacon.rssi,
          // beacon_proximity: this.props.beacon.proximity,
          // beacon_distance: this.props.beacon.distance,
          // achievements_status: this.props.achievements,
          // count_unlocked_achievements: this.props.count,
          beacon_uuid: this.props.beacon.uuid,
        }),
      5000,
    );

    // this.logInfo = setInterval(
    //   () =>
    //     this.props.dispatch(
    //       addToLogger(
    //         deviceUniqueId,
    //         moment().format(),
    //         this.props.beacon,
    //         this.props.achievements,
    //         this.props.count,
    //       ),
    //     ),
    //   5000,
    // );
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
    // clearInterval(this.logInfo);
  }

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };
  // hideFirstModal = () => {
  //   this.setState({ isFirstModalVisible: false });
  // };

  renderBeaconRow(beacon) {
    item = this.props.result;

    return (
      <View>
        {item
          ? <View>
            {item.picture && item.picture.length > 0
                ? <Tile
                  activeOpacity={1}
                  imageSrc={{
                    uri: item.picture,
                  }}
                  featured
                  title={item.name || ''}
                />
                : <Tile
                  activeOpacity={1}
                  imageSrc={{
                    uri:
                        'http://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Badges-and-Labels-PNG/Golden_Badge_Template_PNG_Clipart_Image.png?m=1440754268',
                  }}
                  featured
                  title={item.name || ''}
                />}
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
                      source={{
                        uri:
                            item.image ||
                            'http://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Badges-and-Labels-PNG/Golden_Badge_Template_PNG_Clipart_Image.png?m=1440754268',
                      }}
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

// <Modal
//   isVisible={this.state.isFirstModalVisible}
//   animationIn={'slideInUp'}
//   animationOut={'slideOutDown'}
//   style={styles.bottomModal}
// >
//   <View style={styles.modalContent}>
//     <View style={{ height: 120, margin: 10 }}>
//       <Image
//         source={{
//           uri:
//             'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
//         }}
//         style={{ height: 80, width: 80, margin: 10 }}
//         resizeMode="contain"
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           borderBottomWidth: 1,
//           borderColor: '#e3e3e3',
//           padding: 5,
//         }}
//       >
//         <Text style={{ fontSize: 11, color: '#777' }}>Newbie</Text>
//       </View>
//     </View>
//     <Text style={styles.text}>
//       Enjoy this sticker because you have lauched our awesome App! View your collection of
//       stickers under the Achievements Tab. Explore the campus to collect them all!
//     </Text>
//     <TouchableOpacity onPress={this.hideFirstModal}>
//       <View style={styles.button}>
//         <Text>Dismiss</Text>
//       </View>
//     </TouchableOpacity>
//   </View>
// </Modal>
