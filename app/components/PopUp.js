import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chatMeta: {
    flexDirection: 'row',
  },
  chat: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5,
  },
  chatText: {
    color: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    padding: 10,
    flex: 1,
  },
  labelText: {
    fontSize: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 5,
    backgroundColor: '#dddddd',
  },
  footer: {
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    height: 50,
    width: 200,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: 100,
    backgroundColor: 'darkblue',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  modal: {
    height: 150,
    width: 300,
    marginTop: 200,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: 'darkblue',
    width: 100,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.visible,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modal}
          onRequestClose={() => console.log('request close')}
        >
          <View style={styles.modal}>
            <Text>Yay, you have unlocked a sticker! Collection is started, win them all!</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.setState({ modal: false });
              }}
            >
              <Text style={styles.buttonText}>Got it! </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
