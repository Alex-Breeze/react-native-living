/**
 * Created by buhe on 2016/10/11.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Image
} from 'react-native';

var {height, width} = Dimensions.get('window');

import Rooms from './rooms/Rooms'
import { connect } from 'react-redux';

import icon_menu from '../img/icon-menu.png';

class RoomsView extends Component {
  static route = {
    navigationBar: {
      visible: false
    },
  }

  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer(){
    this.props.navigator.getParentNavigator().toggleDrawer();
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <View
              style={{height:48,width:width,backgroundColor: "rgba(0, 0, 0, 0.9)"}}>
            <TouchableOpacity onPress={this.openDrawer} style={{height:48,width:60,justifyContent:'center',alignItems:'flex-start'}}>
              <Image source={icon_menu} style={{marginLeft:18}}/>
            </TouchableOpacity >
          </View>
          <Rooms />
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

export default connect()(RoomsView);