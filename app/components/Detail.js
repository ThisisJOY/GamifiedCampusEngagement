import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Container from './Container';

const Detail = ({ site }) =>
  <ScrollView>
    <Tile activeOpacity={1} imageSrc={{ uri: site.picture }} featured title={site.name} />
    <Container style={{ backgroundColor: 'lightskyblue' }}>
      <Text>Address</Text>
    </Container>
    <Text>
      {site.address}
    </Text>
    <Container style={{ backgroundColor: 'lightskyblue' }}>
      <Text>Info</Text>
    </Container>
    <Text>
      {site.info}
    </Text>
  </ScrollView>;

Detail.propTypes = {
  site: PropTypes.object,
};

export default Detail;
