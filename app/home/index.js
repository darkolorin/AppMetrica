'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  View,
  StyleSheet,
  Text
} = React;

module.exports = React.createClass({

  renderContent: function () {

  },

  render: function () {
    return <Icon name="chrome" size={80} color="#900" />;
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
    justifyContent: 'center'
  }
});
