import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { achievements } from '../config/data';

const sites = [];
const events = [];

console.log(achievements);

achievements.forEach((achievement) => {
  if (achievement.type && achievement.type === 'site') {
    sites.push(achievement);
  } else if (achievement.type && achievement.type === 'event') {
    events.push(achievement);
  }
});

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
              avatar={item.picture}
              title={item.name}
              onPress={() => this.onLearnMore(item)}
            />,
          )}
        </List>
      </ScrollView>
    );
  }
}

export default Feed;
