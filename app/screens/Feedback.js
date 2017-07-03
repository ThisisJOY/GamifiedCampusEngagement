import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import Container from '../components/Container';

let count = 0;

class Feedback extends Component {
  render() {
    return (
      <Container>
        <Text >{`You have unlocked ${++count} achievement! Explore campus to unlock more achievements to level up!`}</Text>
      </Container>
    );
  }
}

export default Feedback;
