import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, ListView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

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
  };
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      achievement: null,
    };
  }

  showModal(achievement) {
    this.setState({ isModalVisible: true, achievement });
  }

  hideModal = () => this.setState({ isModalVisible: false });

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
          <Image
            source={val.image}
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
              {val.achievementName}
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

export default connect(mapStateToProps)(Achievements);
