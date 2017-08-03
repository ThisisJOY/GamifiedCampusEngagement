import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Analytics from 'react-native-firebase-analytics';
import { readSitesAndEvents } from '../actions/achievements';

class Feed extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    sites: PropTypes.array,
    events: PropTypes.array,
  };

  componentDidMount() {
    Analytics.setScreenName('Feed');
    Analytics.logEvent('tab_navigation_is_clicked', {
      tab_navigation_is_clicked: 'Feed',
    });
    this.props.dispatch(readSitesAndEvents());
  }

  onLearnMore = (item) => {
    Analytics.logEvent('navigate_to_learn_more', {
      navigate_to_learn_more: item.name || 'NA',
    });
    this.props.navigation.navigate('Details', { ...item });
  };

  render() {
    const { screen } = this.props.navigation.state.params;

    const dataSource = screen === 'Sites' ? this.props.sites : this.props.events;

    return (
      <ScrollView>
        <List>
          {dataSource
            ? dataSource.map(item =>
              <ListItem
                key={`${item.major}${item.minor}`}
                roundAvatar
                avatar={{ uri: item.picture }}
                title={item.name}
                onPress={() => this.onLearnMore(item)}
              />,
              )
            : null}
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
