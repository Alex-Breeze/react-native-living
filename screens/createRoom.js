/**
 * Created by buhe on 2016/10/17.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';

import cover_4 from '../img/4.jpg';
import close from '../img/close.png';

var {width,height} = Dimensions.get('window');
import { NavigationBar,TextInput,Button } from '@shoutem/ui';
import { withNavigation } from '@exponent/ex-navigation';

//@withNavigation
//class Close extends React.Component {
//
//  constructor() {
//    super();
//    //this._pop = this._pop.bind(this);
//  }
//
//  //_pop() {
//  //  this.props.navigator.pop();
//  //}
//
//  render() {
//    return (
//        <TouchableOpacity onPress={this.props.pop}>
//          <Image source={close}/>
//        </TouchableOpacity>
//    )
//  }
//}


export default class CreateRoom extends Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }


  constructor() {
    super();
    this._pop = this._pop.bind(this);
    this.start = this.start.bind(this);
  }

  _pop() {
    this.props.navigator.pop();
  }

  start(){
    this.props.navigator.push(Router.getRoute('streaming'));
  }

  render() {
    var self = this;
    return (
        <View style={{flex: 1,backgroundColor:'rgba(0,0,0,0.9)'}}>
          <View style={{height:60,backgroundColor:'transparent',alignItems:'flex-end',justifyContent:'center',marginRight:10}}>
            <TouchableOpacity onPress={self._pop} style={{height:40,width:40}}>
              <Image source={close} />
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView behavior="height">
            <TextInput
                style={{marginTop:80,marginLeft:50,marginRight:50,backgroundColor:'transparent'}}
                placeholder={'room name'}
                />

            <TouchableOpacity onPress={this.start}>
              <View
                  style={{
                  marginTop:100,marginLeft:60,marginRight:60,height:44,backgroundColor:'rgba(237, 87, 87, 1)',
                  justifyContent:'center',alignItems:'center',
                  borderRadius:10
                  }}
                  >
                <Text style={{color:'white'}}>Begin Broadcasting</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
  },
  backgroundImage: {
    position: 'absolute', left: 0, top: 0, width: width, height: height,
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});
