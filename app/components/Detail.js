import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Container from './Container';

const Detail = ({ achievement }) =>
  <ScrollView>
    <Tile
      activeOpacity={1}
      imageSrc={achievement.picture ? achievement.picture : ''}
      featured
      title={achievement.name ? achievement.name : ''}
    />
    <Container style={{ backgroundColor: 'lightskyblue' }}>
      <Text>Address</Text>
    </Container>
    <Text>
      {`Gebouw ${achievement.locatieCode ? achievement.locatieCode : ''}, ${achievement.address
        .straat
        ? achievement.address.straat
        : ''} ${achievement.address.huisnummer ? achievement.address.huisnummer : ''}, ${achievement
        .address.postcode
        ? achievement.address.postcode
        : ''} Delft`}
    </Text>
    <Container style={{ backgroundColor: 'lightskyblue' }}>
      <Text>Description</Text>
    </Container>
    <Text>
      {achievement.info ? achievement.info : ''}
    </Text>
  </ScrollView>;

Detail.propTypes = {
  achievement: PropTypes.object,
};

export default Detail;
