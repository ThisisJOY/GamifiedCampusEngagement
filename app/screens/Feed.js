import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { sites, events } from '../config/data';

class Feed extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  onLearnMore = (item) => {
    this.props.navigation.navigate('Details', { ...item });
  };

  render() {
    const { screen } = this.props.navigation.state.params;

    const dataSource = screen === 'Sites' ? sites : events;

    return (
      <ScrollView>
        <List>
          {dataSource.map(item =>
            <ListItem
              key={item.name}
              roundAvatar
              avatar={{ uri: item.picture }}
              title={item.name.toUpperCase()}
              onPress={() => this.onLearnMore(item)}
            />,
          )}
        </List>
      </ScrollView>
    );
  }
}

export default Feed;
