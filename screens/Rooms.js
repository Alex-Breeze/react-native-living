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
import NoRoom from './rooms/NoRoom'
import Rooms from './rooms/Rooms'

export default class FirstTabScreen extends Component {
  static route = {
    navigationBar: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <NoRoom />
        </View>
    );
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
