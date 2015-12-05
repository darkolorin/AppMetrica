/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var url = require('url');
var config = require('./config/config.js');
var DeviceInfo = require('react-native-device-info');
var formurlencoded = require('form-urlencoded');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} = React;

var OAUTH_URL = [
   config.code_uri,
  '?response_type=code&client_id=' + config.app_key,
  '&state=' + config.state,
  '&device_id='+ DeviceInfo.getUniqueID(),
  '&device_name=' + DeviceInfo.getDeviceId()
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
          <View style = {styles.container}>
            <Text style = {styles.text}> {this.state.token} </Text>
          </View>
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

  onNavigationStateChange: function (navState) {
    var urlObj = url.parse(navState.url, true);
    top:
    if (urlObj.pathname == url.parse(config.redirect_uri).pathname) {
      var code = urlObj.query.code;
      console.log(code);
      var postObj = formurlencoded.encode({
        grant_type: 'authorization_code',
        code: code,
        client_id: config.app_key,
        client_secret: config.app_secret,
        device_id: DeviceInfo.getUniqueID(),
        device_name: DeviceInfo.getDeviceId()
      });


      fetch('https://oauth.yandex.ru/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postObj
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          this.setState({
            login: true,
            token: responseData.access_token
          })
          })
        .catch((err) => console.log(err))
        .done();
      break top;
    }
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    justifyContent: 'center',
  },
  text: {
    color: '#00AA00',
  }
});


AppRegistry.registerComponent('AppMetrica', () => AppMetrica);
