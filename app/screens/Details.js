import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analytics from 'react-native-firebase-analytics';
import Detail from '../components/Detail';

class Details extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentWillMount() {
    Analytics.setScreenName('Details');
  }

  render() {
    const item = this.props.navigation.state.params;

    return <Detail achievement={item} />;
  }
}

export default Details;
