import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, ListView, View } from 'react-native';

const bulbasaur = require('./images/001.png');
const ivysaur = require('./images/002.png');
const venusaur = require('./images/003.png');
const charmanda = require('./images/004.png');
const charmeleon = require('./images/005.png');
const charizard = require('./images/006.png');
const squirtle = require('./images/007.png');
const warturtle = require('./images/008.png');
const blast = require('./images/009.png');
const caterpie = require('./images/010.png');
// This is a dope link for pokedex data https://pokeapi.co/
const pokedexData = [
  {
    id: 0,
    num: '001',
    name: 'BULBASAUR',
    type: 'poision',
    image: bulbasaur,
    color: '#a529ae',
    selected: true,
  },
  {
    id: 1,
    num: '002',
    name: 'IVYSAUR',
    type: 'poision',
    image: ivysaur,
    color: '#a529ae',
    selected: false,
  },
  {
    id: 2,
    num: '003',
    name: 'VENUSAUR',
    type: 'poision',
    image: venusaur,
    color: '#a529ae',
    selected: false,
  },
  {
    id: 3,
    num: '004',
    name: 'CHARMANDAR',
    type: 'fire',
    image: charmanda,
    color: '#bf4600',
    selected: false,
  },
  {
    id: 4,
    num: '005',
    name: 'CHARMELEON',
    type: 'fire',
    image: charmeleon,
    color: '#bf4600',
    selected: false,
  },
  {
    id: 5,
    num: '006',
    name: 'CHARIZARD',
    type: 'fire',
    image: charizard,
    color: '#bf4600',
    selected: false,
  },
  {
    id: 6,
    num: '007',
    name: 'SQUIRTLE',
    type: 'water',
    image: squirtle,
    color: '#0084c1',
    selected: false,
  },
  {
    id: 7,
    num: '008',
    name: 'WARETURTLE',
    type: 'water',
    image: warturtle,
    color: '#0084c1',
    selected: false,
  },
  {
    id: 8,
    num: '009',
    name: 'BLASTOISE',
    type: 'water',
    image: blast,
    color: '#0084c1',
    selected: false,
  },
  {
    id: 9,
    num: '010',
    name: 'CATERPIE',
    type: 'bug',
    image: caterpie,
    color: '#93ab3c',
    selected: false,
  },
];

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(pokedexData),
      image: bulbasaur,
      name: 'BULBASAUR',
      color: '#a529ae',
      number: '001',
    };
  }
  selectPokemon(val) {
    for (let x = 0; x < pokedexData.length; x++) {
      // first we make everything false
      pokedexData[x].selected = false;
    }
    // then we set out val
    pokedexData[val.id].selected = true;

    // then we reset list views
    this.setState({
      name: val.name,
      color: val.color,
      number: val.num,
      image: val.image,
    });
    this.setState({
      dataSource: ds.cloneWithRows(pokedexData),
    });
  }

  balls(x) {
    if (!x.selected) {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              margin: 10,
            }}
          >
            <Text style={{ marginTop: 55, fontSize: 11, color: '#bbb8b6' }}>
              #{x.num}{' '}
            </Text>
            <Text
              style={{
                marginTop: 55,
                color: '#555',
                fontWeight: '700',
                fontSize: 11,
              }}
            >
              {x.name}{' '}
            </Text>
            <View
              style={{
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={styles.line} />
              <TouchableOpacity onPress={() => this.selectPokemon(x)}>
                <Image
                  source={require('./images/pokeOutline.png')}
                  resizeMode="stretch"
                  style={{ marginTop: -6, height: 50, width: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <Text style={{ marginTop: 55, fontSize: 11, color: '#bbb8b6' }}>
            #{x.num}{' '}
          </Text>
          <Text
            style={{
              marginTop: 55,
              color: '#555',
              fontWeight: '700',
              fontSize: 11,
            }}
          >
            {x.name}{' '}
          </Text>
          <View
            style={{
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={styles.line} />
            <TouchableOpacity>
              <Image
                source={require('./images/greatfile.png')}
                resizeMode="stretch"
                style={{ marginTop: -6, height: 50, width: 50 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            margin: 10,
            alignItems: 'center',
            marginBottom: 0,
            backgroundColor: '#e9e9e9',
            borderBottomWidth: 2,
            borderColor: '#d3d2d3',
            justifyContent: 'space-around',
            borderRadius: 5,
          }}
        />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'eachPokedex' })}>
              <Image
                source={this.state.image}
                resizeMode="contain"
                style={{ height: 160, width: 160 }}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: this.state.color,
                padding: 5,
                borderRadius: 5,
                alignSelf: 'flex-start',
                margin: 10,
                marginBottom: 0,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                {this.state.name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#c3c3c3',
                padding: 5,
                borderRadius: 5,
                alignSelf: 'flex-start',
                margin: 10,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
                #{this.state.number}
              </Text>
            </View>
          </View>
          <ListView
            bounce={false}
            style={{ flex: 1, marginBottom: 30 }}
            dataSource={this.state.dataSource}
            renderRow={rowData => this.balls(rowData)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: { height: 60, width: 2, backgroundColor: '#bababb' },
});
