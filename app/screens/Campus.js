import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Container from '../components/Container';

const styles = StyleSheet.create({
  buttonContianer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: -0.5,
    color: 'white',
  },
});

class Campus extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handlePress = (screen) => {
    this.props.navigation.navigate(screen, { ...{ screen } });
  };

  render() {
    return (
      <Container>
        <TouchableOpacity style={styles.buttonContianer} onPress={() => this.handlePress('Sites')}>
          <Image
            resizeMode="contain"
            source={require('./images/sites.jpg')}
            style={styles.imageContainer}
          >
            <Text style={styles.text}>Campus Sites</Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContianer} onPress={() => this.handlePress('Events')}>
          <Image
            resizeMode="contain"
            source={require('./images/events.jpg')}
            style={styles.imageContainer}
          >
            <Text style={styles.text}>Campus Events</Text>
          </Image>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Campus;
