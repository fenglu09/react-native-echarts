import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import WebView from 'react-native-webview';
import { isFunction } from '../../../../../src/utils/DataTypeUtil';

let source = Platform.OS == 'ios' ? require('./tpl.html') : { 'uri': 'file:///android_asset/echarts/tpl.html' };
export default class App extends Component {

  /**add by david at 2019-11-26 start  */
  constructor(props) {
    super(props);
    let { type } = this.props
    if (!!type && type == 'funnel') {
      source = Platform.OS == 'ios' ? require('./tpl_funnel.html') : { 'uri': 'file:///android_asset/echarts/tpl_funnel.html' };
    } else {
      source = Platform.OS == 'ios' ? require('./tpl.html') : { 'uri': 'file:///android_asset/echarts/tpl.html' };
    }
  }
  handleOnLoad() {
    if (this.props.loadFinishCallback && isFunction(this.props.loadFinishCallback)) {
      this.props.loadFinishCallback()
    }
  }

  /**add by david at 2019-11-26 end  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400, }}>
        <WebView
          onLoad={() => { this.handleOnLoad() }}
          originWhitelist={['*']}//RN0.56开始，本地的html加载 添加白名单
          ref="chart"
          // scalesPageToFit={false}
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          source={source}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
