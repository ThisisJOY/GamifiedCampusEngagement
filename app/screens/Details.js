import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analytics from 'react-native-firebase-analytics';
import { Text, ScrollView, View } from 'react-native';
import { Tile } from 'react-native-elements';
import Container from '../components/Container';

const io = require('./images/io.jpg');
const me = require('./images/3me.jpg');
const ewi = require('./images/ewi.jpg');
const aula = require('./images/aula.jpg');
const library = require('./images/library.jpg');
const civil = require('./images/civil.jpg');
const appliedsciences = require('./images/appliedsciences.jpg');
const cio = require('./images/cio.jpg');
const noimage = require('./images/noimage.jpg');

class Details extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    Analytics.setScreenName('Details');
    Analytics.logEvent('visiting_details_screen', {
      visiting_details_screen: 'Details',
    });
  }

  render() {
    const item = this.props.navigation.state.params;
    let pictureSource = noimage;
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
    return (
      <ScrollView>
        {item.picture && item.picture.length > 0
          ? <Tile
            activeOpacity={1}
            imageSrc={pictureSource}
            featured
            title={item.name ? item.name : ''}
          />
          : <Tile
            activeOpacity={1}
            imageSrc={noimage}
            featured
            title={item.name ? item.name : ''}
          />}
        <Container style={{ backgroundColor: 'lightskyblue' }}>
          <Text>Address</Text>
        </Container>
        <Text>
          {`Gebouw ${item.locatieCode ? item.locatieCode : ''}, ${item.address &&
          item.address.straat
            ? item.address.straat
            : ''} ${item.address && item.address.huisnummer
            ? item.address.huisnummer
            : ''}, ${item.postcode && item.address.postcode ? item.address.postcode : ''} Delft`}
        </Text>
        {item.start
          ? <View>
            <Container style={{ backgroundColor: 'lightskyblue' }}>
              <Text>Time</Text>
            </Container>
            <Text>{`Start time: ${item.start}`}</Text>
            <Text>{`End time: ${item.end ? item.end : ''}`}</Text>
          </View>
          : null}
        <Container style={{ backgroundColor: 'lightskyblue' }}>
          <Text>Description</Text>
        </Container>
        <Text>
          {item.info ? item.info : ''}
        </Text>
      </ScrollView>
    );
  }
}

export default Details;
