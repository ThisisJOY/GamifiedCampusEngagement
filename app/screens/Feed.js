import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { readSitesAndEvents } from '../actions/achievements';

class Feed extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    sites: PropTypes.array,
    events: PropTypes.array,
  };

  componentDidMount() {
    this.props.dispatch(readSitesAndEvents());
  }

  onLearnMore = (item) => {
    this.props.navigation.navigate('Details', { ...item });
  };

  render() {
    const { screen } = this.props.navigation.state.params;

    const dataSource = screen === 'Sites' ? this.props.sites : this.props.events;

    return (
      <ScrollView>
        <List>
          {dataSource.map(item =>
            <ListItem
              key={item.name}
              roundAvatar
              avatar={{ uri: item.picture }}
              title={item.name}
              onPress={() => this.onLearnMore(item)}
            />,
          )}
        </List>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  achievements: state.achievements.achievements,
  sites: state.achievements.sites,
  events: state.achievements.events,
});

export default connect(mapStateToProps)(Feed);
