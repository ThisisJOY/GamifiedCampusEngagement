import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, ListView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Analytics from 'react-native-firebase-analytics';
import database from '../actions/database';
import { getAdmin } from '../actions/achievements';

console.ignoredYellowBox = ['Setting a timer'];

const physcBack = require('./images/physcBack.jpg');
const congratulations = require('./images/congratulations.png');
const mystic = require('./images/mystic.png');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const WIDTH = 200;

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
  text: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.5,
  },
});

class Achievements extends Component {
  static propTypes = {
    achievements: PropTypes.array,
    count: PropTypes.number,
    onGetAdmin: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      achievement: null,
    };
    this.writeDB();
  }

  componentDidMount() {
    Analytics.setScreenName('Achievements');
    Analytics.logEvent('tab_navigation_is_clicked', {
      tab_navigation_is_clicked: 'Achievements',
    });
    this.props.onGetAdmin();
  }

  writeDB() {
    database.ref('Admin').set([
      {
        type: 'site',
        uuid: '01122334-4556-6778-899a-abbccddeeff0',
        major: 772,
        minor: 258,
        achievementName: 'Newbie',
        isUnlocked: false,
        image:
          'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
        instruction:
          'Visit Electrical Engineering, Mathematics and Computer Sciences to unlock this sticker!',
        feedback:
          'Congratulations! You are now a Newbie! Do not wait! Continue to collect them all!',
        address: {
          postcode: '2628 CD',
          straat: 'Mekelweg',
          huisnummer: '4',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99903', '@lat': '4.37323' },
        name: 'Electrical Engineering, Mathematics and Computer Sciences',
        locatieCode: '36',
        picture: 'https://sg.tudelft.nl/wp-content/uploads/2013/10/TU-Delft-EWI-Building.jpg',
        info:
          'The Faculty of Architecture and the Built Environment at TU Delft (Dutch: Faculteit Bouwkunde; abbr. BK ) is the largest faculty of the university with around 2900 students. It is also one of the top faculties of the TU Delft and was ranked 3rd in the world’s top universities for architecture & built environment in the QS World University Rankings by Subject 2015, following the Massachusetts Institute of Technology (MIT) and University College London (UCL).',
      },
      {
        type: 'event',
        uuid: '01122334-4556-6778-899a-abbccddeeff0',
        major: 258,
        minor: 772,
        achievementName: 'Explorer',
        isUnlocked: false,
        image:
          'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
        instruction: 'You can unlock this sticker if you attend Latitud Presents on time!',
        feedback:
          'Congratulations! You are now an explorer! Do not wait! Continue to collect them all!!',
        address: {
          postcode: '2629 HS',
          straat: 'Kluyverweg',
          huisnummer: '5',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99065', '@lat': '4.37756' },
        name: 'Latitud Presents',
        start: 'Sunday, July 16, 2017 7:30 PM',
        end: 'Sunday, July 16, 2017 10:00 PM',
        cost: '8.00 euro',
        locatieCode: '66',
        picture: 'http://www.aal-europe.eu/wp-content/uploads/2013/12/events_medium.jpg',
        info:
          'The Faculty of Architecture and the Built Environment at TU Delft (Dutch: Faculteit Bouwkunde; abbr. BK ) is the largest faculty of the university with around 2900 students. It is also one of the top faculties of the TU Delft and was ranked 3rd in the world’s top universities for architecture & built environment in the QS World University Rankings by Subject 2015, following the Massachusetts Institute of Technology (MIT) and University College London (UCL).',
      },
      {
        type: 'site',
        uuid: '01122334-4556-6778-899a-abbccddeeff0',
        major: 7722,
        minor: 2584,
        achievementName: 'Adventurer',
        isUnlocked: false,
        image:
          'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
        instruction:
          'Visit Electrical Engineering, Mathematics and Computer Sciences to unlock this sticker!',
        feedback:
          'Congratulations! You are now an adventurer! Do not wait! Continue to collect them all!',
        address: {
          postcode: '2628 CD',
          straat: 'Mekelweg',
          huisnummer: '4',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99903', '@lat': '4.37323' },
        name: 'Electrical Engineering, Mathematics and Computer Sciences',
        locatieCode: '36',
        picture: 'https://sg.tudelft.nl/wp-content/uploads/2013/10/TU-Delft-EWI-Building.jpg',
        info:
          'The Faculty of Architecture and the Built Environment at TU Delft (Dutch: Faculteit Bouwkunde; abbr. BK ) is the largest faculty of the university with around 2900 students. It is also one of the top faculties of the TU Delft and was ranked 3rd in the world’s top universities for architecture & built environment in the QS World University Rankings by Subject 2015, following the Massachusetts Institute of Technology (MIT) and University College London (UCL).',
      },
    ]);
  }

  showModal(achievement) {
    Analytics.logEvent('show_achievement_modal', {
      show_achievement_modal: achievement.name,
    });
    this.setState({ isModalVisible: true, achievement });
  }

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  eachRow(val) {
    if (!val.isUnlocked) {
      return (
        <TouchableOpacity onPress={() => this.showModal(val)}>
          <View style={{ height: 120, margin: 10 }}>
            <Image
              source={mystic}
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
              <Text style={{ fontSize: 11, color: '#777' }}>Locked</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => this.showModal(val)}>
        <View style={{ height: 120, margin: 10 }}>
          {val.image && val.image.length > 0
            ? <Image
              source={{
                uri: val.image,
              }}
              style={{ height: 80, width: 80, margin: 10 }}
              resizeMode="contain"
            />
            : <Image
              source={{
                uri: 'https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg',
              }}
              style={{ height: 80, width: 80, margin: 10 }}
              resizeMode="contain"
            />}
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
              {val.achievementName || ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
        <Image
          source={physcBack}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: 180,
          }}
        >
          <Image
            source={congratulations}
            style={{ height: 100, width: 100, marginLeft: 10, marginRight: 30, marginTop: -80 }}
          />
          <View style={{ height: 12, width: 200 }}>
            <Text style={{ color: '#000000', fontWeight: '600', fontSize: 12 }}>
              {`You have unlocked ${this.props.count} of ${this.props.achievements
                .length} stickers. Don not wait, collect them all!`}
            </Text>
            <View
              style={{
                height: 10,
                width: WIDTH,
                borderColor: '#FF0000',
                marginTop: 3,
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  height: 8,
                  width: this.props.count / this.props.achievements.length / 0.005,
                  backgroundColor: '#f96062',
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        </Image>
        <ListView
          dataSource={ds.cloneWithRows(this.props.achievements)}
          style={{ height: 390 }}
          contentContainerStyle={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          renderRow={rowData => this.eachRow(rowData)}
        />
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this.state.achievement && this.state.achievement.isUnlocked
            ? <View style={styles.modalContent}>
              <Text style={styles.text}>
                {this.state.achievement && this.state.achievement.feedback
                    ? this.state.achievement.feedback
                    : ''}
              </Text>
              <TouchableOpacity onPress={this.hideModal}>
                <View style={styles.button}>
                  <Text>Dismiss</Text>
                </View>
              </TouchableOpacity>
            </View>
            : <View style={styles.modalContent}>
              <Text style={styles.text}>
                {this.state.achievement && this.state.achievement.instruction
                    ? this.state.achievement.instruction
                    : ''}
              </Text>
              <TouchableOpacity onPress={this.hideModal}>
                <View style={styles.button}>
                  <Text>Dismiss</Text>
                </View>
              </TouchableOpacity>
            </View>}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  achievements: state.achievements.achievements,
  count: state.achievements.count,
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAdmin: () => dispatch(getAdmin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);
