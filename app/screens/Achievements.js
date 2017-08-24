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
const noimage = require('./images/noimage.jpg');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

// const WIDTH = 200;

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
    // count: PropTypes.number,
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
    Analytics.logEvent('visiting_achievement_screen', {
      visiting_achievement_screen: 'Achievements',
    });
    this.props.onGetAdmin();
  }

  writeDB() {
    database.ref('Admin').set([
      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 3697,
        minor: 44083,
        achievementName: 'Mr. Designer',
        isUnlocked: false,
        image: 'sticker11',
        instruction: 'Visit Industrial Design Engineering to unlock this sticker!',
        feedback:
          'Congratulations! You are now a Mr. Designer! Do not wait! Continue to collect them all!',
        address: {
          postcode: '2628 CE',
          straat: 'Landbergstraat',
          huisnummer: '15',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.001622', '@lat': '4.370026' },
        name: 'Industrial Design Engineering',
        locatieCode: '32',
        picture: 'io',
        info:
          'The first academic education programmes for industrial designers were at the TU Delft Faculty of Architecture. This faculty trained not only architects, but also designers of furniture and everyday utensils. The first students of the ‘Technical and Industrial Design’ programme started their education with a foundation course in Architecture. In 1969, an independent programme in Technical Industrial Design was established with its own engineering degree. In addition to design, technical subjects played a major role. Ergonomics were also incorporated immediately and furthermore, market research was carried out. Finally, the management side was included in the programme. In 1981, the engineering degree and the interim department was renamed Industrial Design. When the Technical Polytechnic became the Delft University of Technology in 1986, Industrial Design finally became the Faculty of Industrial Design.',
      },
      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 47359,
        minor: 47605,
        achievementName: '1UP',
        isUnlocked: false,
        image: 'sticker12',
        instruction:
          'Visit Mechanical, Maritime and Materials Engineering (3mE) to unlock this sticker!',
        feedback: 'Congratulations! You are now a 1UP! Do not wait! Continue to collect them all!',
        address: {
          postcode: '2628 CD',
          straat: 'Mekelweg',
          huisnummer: '2',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.000973', '@lat': '4.37196' },
        name: 'Mechanical, Maritime and Materials Engineering',
        picture: 'me',
        info:
          'Welcome at 3mE, one of the eight faculties of the TU Delft. The faculty of 3mE trains socially engaged, responsible engineers. The faculty offers three bachelor courses: Mechanical Engineering, Marine Technology, Clinical Technology. And you can choose from seven challenging master courses.',
      },
      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 39084,
        minor: 19295,
        achievementName: 'Explorer',
        isUnlocked: false,
        image: 'sticker13',
        instruction:
          'Visit Electronic Engineering, Mathematics and Computer Sciences (EWI) to unlock this sticker!',
        feedback:
          'Congratulations! You are now an explorer! Do not wait! Continue to collect them all!!',
        address: {
          postcode: '2628 CD',
          straat: 'Mekelweg',
          huisnummer: '4',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99903', '@lat': '4.37323' },
        name: 'Electrical Engineering, Mathematics and Computer Sciences',
        locatieCode: '36',
        picture: 'ewi',
        info:
          'The EWI building is a building on the Mekelweg in Delft on the TU Delft campus . With a height of 90 meters, the building is the highest of Delft after the New Church . The Faculty of Electrical Engineering, Mathematics and Computer Science is housed here. The building is colored red / blue. A large clock has been confirmed on both the northern and southern façades, one of which is seen from the Delft station .',
      },
      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 13237,
        minor: 16895,
        achievementName: 'Adventurer',
        isUnlocked: false,
        image: 'sticker4',
        instruction: 'Visit Civil Engineering and Geosciences (CiTG) to unlock this sticker!',
        feedback:
          'Congratulations! You are now an adventurer! Do not wait! Continue to collect them all!',
        address: {
          postcode: '2628 CN',
          straat: 'Stevinweg',
          huisnummer: '1',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99913', '@lat': '4.37595' },
        name: 'Civil Engineering and Geosciences',
        locatieCode: '23',
        picture: 'civil',
        info:
          'Civil engineering is concerned with the development, design, construction, production and management of the physical infrastructure required to safeguard the safety, health, business activity and sustainability of our society. These facilities are built to provide services such as water management, soil management, urban development, flood protection, drinking water production, waste treatment, transport by water, rail and road, and to perform other functions for the public (such as utilities and offices). The programme at TU Delft is the oldest Civil Engineering course in the Netherlands. The course has traditionally emphasised the interaction between theory and practice and between research and education. Students and researchers therefore enjoy excellent and extensive laboratory, ICT and library facilities.',
      },

      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 44521,
        minor: 60091,
        achievementName: 'Scientist',
        isUnlocked: false,
        image: 'sticker5',
        instruction: 'Visit Applied Physics (Technische Natuurkunde) to unlock this sticker!',
        feedback:
          'Congratulations! You are now an Scientist! Do not wait! Continue to collect them all!!',
        address: {
          postcode: '2628 CJ',
          straat: 'Lorentzweg',
          huisnummer: '1',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.9897', '@lat': '4.3798' },
        name: 'Applied Sciences',
        locatieCode: '22',
        picture: 'appliedsciences',
        info:
          'The Faculty of Applied Sciences is the largest faculty of TU Delft and focuses on finding innovative solutions to social problems. In addition, developing fundamental knowledge for technical developments that can be applied widely in society .',
      },

      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 65518,
        minor: 24956,
        achievementName: 'Fried Check-in',
        isUnlocked: false,
        image: 'sticker6',
        instruction: 'Visit Aula Conference Center to unlock this sticker!',
        feedback:
          'Congratulations! You are now a Fried Check-in! Do not wait! Continue to collect them all!!',
        address: {
          postcode: '2628 BL',
          straat: 'Julianalaan',
          huisnummer: '132-134',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.005696', '@lat': '4.370439' },
        name: 'Aula Conference Center',
        locatieCode: '08',
        picture: 'aula',
        info:
          'TU Delft Aula was designed by Van den Broek en Bakema architecture bureau founded by two TU Delft alumni Jo van den Broek and Jaap Bakema. It was officially opened on 6 January 1966 by Dutch Prime Minister Jo Cals. It is a classical example of a structure built in Brutalist style. TU Delft Aula, which symbolically opens the Mekelpark, houses main university restaurant and store, as well as lecture halls, auditoria, congress center, and administrative offices of the university. All doctoral promotion, honoris causa ceremonies, as well as academic senate meetings take place in the Aula.',
      },
      {
        type: 'site',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 37584,
        minor: 53467,
        achievementName: 'Bookworm',
        isUnlocked: false,
        image: 'sticker7',
        instruction: 'Visit library to unlock this sticker!',
        feedback:
          'Congratulations! You are now a bookworm! Do not wait! Continue to collect them all!!',
        address: {
          postcode: '2628 ZC',
          straat: 'Prometheusplein',
          huisnummer: '1',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.00262', '@lat': '4.37524' },
        name: 'TU Delft Library',
        locatieCode: '21',
        picture: 'library',
        info:
          'The TU Delft Library, constructed in 1997, was designed by Delft-based Mecanoo architecture bureau. It is located behind university aula. The roof of the library is covered with grass, which serves as a natural insulation. The structure lifts from the ground on one side allowing to walk to the top of the building. The library is topped by the steel cone, giving its unique shape. All the walls are completely filled with glass. The library won the Dutch National Steel Prize in 1998 in the buildings of steel and hybrid constructions category.',
      },
      {
        type: 'event',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 11655,
        minor: 47521,
        achievementName: 'Collect student card',
        isUnlocked: false,
        image: 'sticker8',
        instruction: 'Visit Central International Office (CIO) to unlock this sticker!',
        feedback: 'Congratulations! You collect your student card!',
        address: {
          postcode: '2628 BX',
          straat: 'Jaffalaan',
          huisnummer: '9a',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.00277', '@lat': '4.37103' },
        name: 'Collect student card',
        locatieCode: '30a',
        start: 'Sunday, August 24, 2017 2:00 PM',
        end: 'Sunday, August 24, 2017 5:00 PM',
        cost: 'free',
        picture: 'cio',
        info:
          'Central International Office manages all education and affairs for international students.',
      },

      {
        type: 'event',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 8806,
        minor: 16058,
        achievementName: 'Free pizza',
        isUnlocked: false,
        image: 'sticker9',
        instruction: 'Visit Canteen at Aula to unlock this sticker!',
        feedback: 'Congratulations! You can get free pizza!',
        address: {
          postcode: '2628 BL',
          straat: 'Julianalaan',
          huisnummer: '132-134',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.005696', '@lat': '4.370439' },
        name: 'Free pizza',
        start: 'Sunday, July 16, 2017 7:30 PM',
        end: 'Sunday, July 16, 2017 10:00 PM',
        cost: '8.00 euro',
        locatieCode: '66',
        picture: 'aula',
        info: 'There are free food at Aula from time to time.',
      },

      {
        type: 'event',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 56581,
        minor: 51019,
        achievementName: 'Graduation',
        isUnlocked: false,
        image: 'sticker10',
        instruction: 'Visit underground pub at EWI to unlock this sticker!',
        feedback: 'You attend a graduation party! Have fun!',
        address: {
          postcode: '2628 CD',
          straat: 'Mekelweg',
          huisnummer: '4',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99903', '@lat': '4.37323' },
        name: 'Party',
        start: 'Sunday, July 16, 2017 7:30 PM',
        end: 'Sunday, July 16, 2017 10:00 PM',
        cost: '8.00 euro',
        locatieCode: '36',
        picture: 'ewi',
        info: 'Endless drinks here.',
      },

      {
        type: 'hidden',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 44522,
        minor: 58303,
        achievementName: 'Walk around at library',
        isUnlocked: false,
        image: 'sticker1',
        instruction: 'Hidden Treasure!',
        feedback: 'Congratulations! You win a hidden treasure at this building!',
        address: {
          postcode: '2628 ZC',
          straat: 'Prometheusplein',
          huisnummer: '1',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.00262', '@lat': '4.37524' },
        name: 'Walk around at library',
        locatieCode: '21',
        picture: 'library',
        info: 'Walk more to find more hidden treasure.',
      },

      {
        type: 'hidden',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 64225,
        minor: 33098,
        achievementName: 'Walk around at EWI',
        isUnlocked: false,
        image: 'sticker2',
        instruction: 'Hidden Treasure!',
        feedback: 'Congratulations! You win a hidden treasure at this building!',
        address: {
          postcode: '2628 CD',
          straat: 'Mekelweg',
          huisnummer: '4',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '51.99903', '@lat': '4.37323' },
        name: 'Walk around at ewi',
        locatieCode: '36',
        picture: 'ewi',
        info: 'Walk more to find more hidden treasure.',
      },

      {
        type: 'hidden',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        major: 30735,
        minor: 22413,
        achievementName: 'Walk around at IO',
        isUnlocked: false,
        image: 'sticker3',
        instruction: 'Hidden Treasure!',
        feedback: 'Congratulations! You win a hidden treasure at this building!',
        address: {
          postcode: '2628 CE',
          straat: 'Landbergstraat',
          huisnummer: '15',
          plaats: 'Delft',
        },
        gpscoordinaten: { '@lon': '52.001622', '@lat': '4.370026' },
        locatieCode: '32',
        name: 'Walk around at IO',
        picture: 'io',
        info: 'Walk more to find more hidden treasure.',
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

    let imageSource;
    switch (val.image) {
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

    return (
      <TouchableOpacity onPress={() => this.showModal(val)}>
        <View style={{ height: 120, margin: 10 }}>
          {val.image && val.image.length > 0
            ? <Image
              source={imageSource}
              style={{ height: 80, width: 80, margin: 10 }}
              resizeMode="contain"
            />
            : <Image
              source={noimage}
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

// <View style={{ height: 12, width: 200 }}>
//   <Text style={{ color: '#000000', fontWeight: '600', fontSize: 12 }}>
//     {`You have unlocked ${this.props.count} of ${this.props.achievements
//       .length} stickers. Don not wait, collect them all!`}
//   </Text>
//   <View
//     style={{
//       height: 10,
//       width: WIDTH,
//       borderColor: '#FF0000',
//       marginTop: 3,
//       borderWidth: 1,
//       borderRadius: 5,
//     }}
//   >
//     <View
//       style={{
//         height: 8,
//         width: this.props.count / this.props.achievements.length / 0.005,
//         backgroundColor: '#f96062',
//         borderRadius: 5,
//       }}
//     />
//   </View>
// </View>
