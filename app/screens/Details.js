import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Detail from '../components/Detail';

class Details extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const site = this.props.navigation.state.params;

    return <Detail site={site} />;
  }
}

export default Details;
