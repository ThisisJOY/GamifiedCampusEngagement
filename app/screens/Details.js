import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Detail from '../components/Detail';

class Details extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const item = this.props.navigation.state.params;

    return <Detail achievement={item} />;
  }
}

export default Details;
