import React from 'react';
import { WebView, Platform } from 'react-native';

export default class Item extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  render = () => {
    return (
      <WebView
        source={{ uri: 'http://113.190.240.90:2004/so-tay-cu-dan-1' }}
        scalesPageToFit={Platform.OS !== 'ios'}
      />
    );
  };
}
