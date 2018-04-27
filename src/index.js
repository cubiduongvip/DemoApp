import React from 'react';
import { YellowBox } from 'react-native';

import Router from './router';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  render = () => {
    return <Router />;
  };
}
