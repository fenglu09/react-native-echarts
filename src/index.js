import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Echarts } from './components'
import WebView from 'react-native-webview';

export default class App extends Component {
  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} />
      </Container>
    );
  }
}
