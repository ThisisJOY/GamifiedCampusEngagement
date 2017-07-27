import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Container from './Container';

const Detail = ({ achievement }) =>
  <ScrollView>
    {achievement.picture && achievement.picture.length > 0
      ? <Tile
        activeOpacity={1}
        imageSrc={{
          uri: achievement.picture,
        }}
        featured
        title={achievement.name ? achievement.name : ''}
      />
      : <Tile
        activeOpacity={1}
        imageSrc={{
          uri: 'https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg',
        }}
        featured
        title={achievement.name ? achievement.name : ''}
      />}
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
