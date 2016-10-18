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
    Image
} from 'react-native';

import empty_illustration from '../../img/empty-illustration.png'
import add_button from '../../img/add-button.png'
import { withNavigation } from '@exponent/ex-navigation';
import { connect } from 'react-redux';

@withNavigation
class NoRoom extends Component {

  constructor() {
    super();
    this.createRoom = this.createRoom.bind(this);
  }

  createRoom(){
    this.props.navigator.push(Router.getRoute('createRoom'));
  }

  render() {
    return (
        <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.9)',alignItems: 'center',}}>
          <Image source={empty_illustration} style={{marginTop:66}}/>
          <Text style={{marginTop:16,color:'rgba(255, 255, 255, 1)',fontSize:18}}>No broadcasting now</Text>
          <Text style={{marginTop:9.5,color:'rgba(255, 255, 255, 1)',fontSize:12}}>You can click below button to begin to live.</Text>
          <TouchableOpacity onPress={this.createRoom}>
            <Image source={add_button} style={{marginTop:63.5}}/>
          </TouchableOpacity>
        </View>
    )
  }
}

export default connect()(NoRoom);