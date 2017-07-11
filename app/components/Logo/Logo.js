import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth,
    height: imageWidth,
  },
  image: {
    width: imageWidth / 2,
  },
  text: {
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    backgroundColor: '#de737b',
  },
});

const Logo = () =>
  <View style={styles.container}>
    <Image
      resizeMode="contain"
      style={styles.containerImage}
      source={require('./images/background.png')}
    >
      <Image resizeMode="contain" style={styles.image} source={require('./images/logo.png')} />
    </Image>
    <Text style={styles.text}>Explore the campus to unlock all stickers!</Text>
  </View>;

export default Logo;
