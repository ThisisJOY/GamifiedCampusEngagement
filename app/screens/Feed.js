import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Analytics from 'react-native-firebase-analytics';
import { readSitesAndEvents } from '../actions/achievements';

const io = require('./images/io.jpg');
const me = require('./images/3me.jpg');
const ewi = require('./images/ewi.jpg');
const aula = require('./images/aula.jpg');
const library = require('./images/library.jpg');
const civil = require('./images/civil.jpg');
const appliedsciences = require('./images/appliedsciences.jpg');
const cio = require('./images/cio.jpg');
const tpm = require('./images/tpm.jpg');
const architecture = require('./images/architecture.jpg');
const aerospace = require('./images/aerospace.jpg');
const noimage = require('./images/noimage.jpg');

class Feed extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    sites: PropTypes.array,
    events: PropTypes.array,
  };

  componentDidMount() {
    Analytics.setScreenName('Feed');
    Analytics.logEvent('visiting_feed_screen', {
      visiting_feed_screen: 'Feed',
    });
    this.props.dispatch(readSitesAndEvents());
  }

  onLearnMore = (item) => {
    Analytics.logEvent('visiting_details_screen', {
      visiting_details_screen: item.name || 'NA',
    });
    this.props.navigation.navigate('Details', { ...item });
  };

  choosePicture(item) {
    let pictureSource = noimage;
    if (item.picture && item.picture.length > 0) {
      switch (item.picture) {
        case 'io':
          pictureSource = io;
          break;
        case 'me':
          pictureSource = me;
          break;
        case 'ewi':
          pictureSource = ewi;
          break;
        case 'aula':
          pictureSource = aula;
          break;
        case 'library':
          pictureSource = library;
          break;
        case 'civil':
          pictureSource = civil;
          break;
        case 'appliedsciences':
          pictureSource = appliedsciences;
          break;
        case 'cio':
          pictureSource = cio;
          break;
        case 'tpm':
          pictureSource = tpm;
          break;
        case 'architecture':
          pictureSource = architecture;
          break;
        case 'aerospace':
          pictureSource = aerospace;
          break;
        default:
          pictureSource = noimage;
      }
    }
    return pictureSource;
  }

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
                avatar={this.choosePicture(item)}
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
