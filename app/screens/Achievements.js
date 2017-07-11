import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, ListView, View, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
// import Button from '../components/Button';

import { currentPokemon } from '../config/data';

const physcBack = require('./images/physcBack.jpg');
const congratulations = require('./images/congratulations.png');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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

export default class Achievements extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(currentPokemon),
      isModalVisible: false,
      text: '',
    };
  }

  showModal(text) {
    this.setState({ isModalVisible: true, text });
  }

  hideModal = () => this.setState({ isModalVisible: false });

  modalContent = () =>
    <View style={styles.modalContent}>
      <Text>
        {this.state.text ? this.state.text : ''}
      </Text>
      <TouchableOpacity onPress={this.hideModal}>
        <View style={styles.button}>
          <Text>Dismiss</Text>
        </View>
      </TouchableOpacity>
    </View>;

  eachRow(val) {
    return (
      <TouchableOpacity onPress={() => this.showModal(val.desc)}>
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
              {val.name}
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
              You have unlocked 10 of 20 stickers. Don not wait, collect them all!
            </Text>
            <View
              style={{
                height: 10,
                width: 200,
                borderColor: '#FF0000',
                marginTop: 3,
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  height: 8,
                  width: 100,
                  backgroundColor: '#f96062',
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        </Image>
        <ListView
          dataSource={this.state.dataSource}
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
          {this.modalContent()}
        </Modal>
      </View>
    );
  }
}
