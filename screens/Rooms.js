/**
 * Created by buhe on 2016/10/11.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import NoRoom from './rooms/NoRoom'
import Rooms from './rooms/Rooms'

export default class FirstTabScreen extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../img/icon-menu.png'),
      //title: 'Menu',
      id: 'menu'
    }]
  };
  static navigatorStyle = {
    navBarBackgroundColor: 'rgba(0, 0, 0, 0.9)',
    navBarButtonColor: '#ffffff',
    drawUnderNavBar: true,
    //navBarTranslucent: true,
    //navBarBlur: true,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <NoRoom />
        </View>
    );
  }

  onPushPress() {
    this.props.navigator.push({
      title: "More",
      screen: "example.PushedScreen"
    });
  }

  onPushStyledPress() {
    this.props.navigator.push({
      title: "Styled",
      screen: "example.StyledScreen"
    });
  }

}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
});
