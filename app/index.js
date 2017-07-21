import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Root } from './config/router';
import store from './config/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
