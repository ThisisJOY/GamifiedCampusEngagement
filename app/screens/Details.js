import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analytics from 'react-native-firebase-analytics';
import Detail from '../components/Detail';

class Details extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    Analytics.setScreenName('Details');
    Analytics.logEvent('tab_navigation_is_clicked', {
      tab_navigation_is_clicked: 'Details',
    });
  }

  render() {
    const item = this.props.navigation.state.params;

    return <Detail achievement={item} />;
  }
}

export default Details;
