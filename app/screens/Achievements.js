import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, ListView, View } from 'react-native';
import Container from '../components/Container';
import PopUp from '../components/PopUp';

const burb = require('./images/001.png');
const alakazam = require('./images/Alakazam.png');
const mewtwo = require('./images/mewtwo.png');
const gyarados = require('./images/Gyarados.png');
const charmeleon = require('./images/005.png');
const charizard = require('./images/006.png');
const squirtle = require('./images/007.png');
const warturtle = require('./images/008.png');
const caterpie = require('./images/010.png');

const currentPokemon = [
  {
    name: 'Bulbasaur',
    image: burb,
    selected: false,
  },
  {
    name: 'Alakazam',
    image: alakazam,
    selected: false,
  },
  {
    name: 'Mewtwo',
    image: mewtwo,
    selected: false,
  },
  {
    name: 'Gyarados',
    image: gyarados,
    selected: false,
  },
  {
    name: 'Charmeleon',
    image: charmeleon,
    selected: false,
  },
  {
    name: 'Charizard',
    image: charizard,
    selected: false,
  },
  {
    name: 'Squirtle',
    image: squirtle,
    selected: false,
  },
  {
    name: 'Warturtle',
    image: warturtle,
    selected: false,
  },
  {
    name: 'Caterpie',
    image: caterpie,
    selected: false,
  },
];

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Achievements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(currentPokemon),
    };
  }

  eachRow(val) {
    const health = Math.floor(Math.random() * 90 + 1);
    let healthColor;

    // custom health colors
    if (health < 20) {
      healthColor = '#f96062';
    } else if (health > 19 && health < 40) {
      healthColor = '#fbd34e';
    } else {
      healthColor = '#b7eb9b';
    }

    return (
      <TouchableOpacity>
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
            <Text style={{ fontSize: 11, color: '#777' }}>CP</Text>
            <Text style={{ fontSize: 11, color: '#777' }}>
              {health}
            </Text>
          </View>
          <View
            style={{
              height: 5,
              width: 90,
              borderColor: '#c7c7c7',
              margin: 3,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <View
              style={{ height: 4, width: health, backgroundColor: healthColor, borderRadius: 5 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
        <PopUp />
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
        <View style={{ flexDirection: 'row', flex: 1, height: 10, padding: 15 }}>
          <View
            style={{
              flex: 1,
              height: 30,
              borderRadius: 5,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#e7e7e7',
            }}
          >
            <Text style={{ fontSize: 11, color: '#666', fontWeight: '600' }}>TRANSFER</Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              borderRadius: 5,
              borderBottomWidth: 1,
              justifyContent: 'center',
              marginTop: 20,
              borderColor: '#e7e7e7',
            }}
          />

          <View
            style={{
              flex: 1,
              height: 30,
              borderRadius: 5,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#e7e7e7',
            }}
          >
            <Text style={{ fontSize: 11, color: '#666', fontWeight: '600' }}>EVOLVE</Text>
          </View>
        </View>
      </View>
    );
  }
}
