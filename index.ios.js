/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var url = require('url');
var config = require('./config/config.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} = React;

var OAUTH_URL = [
  config.code_uri,
  '?client_id=' + config.app_key,
  '&response_type=code',
  '&redirect_uri=' + config.redirect_uri
].join('');

var AppMetrica = React.createClass({

  getInitialState: function () {
    return {
      login: false
    }
  },

  componentDidMount: function () {

    },

    render: function() {

      if (this.state.login) {
          return (
            <HomeView />
          );
      }

      return (
        <View style={{flex: 1}}>
          <WebView
            ref={'webview'}
            url={OAUTH_URL}
            automaticallyAdjustContentInsets={false}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            startInLoadingState={true}
            scalesPageToFit={true} />
        </View>
      );
    },

});

AppRegistry.registerComponent('AppMetrica', () => AppMetrica);
