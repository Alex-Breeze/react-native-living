/**
 * Created by buhe on 2016/10/19.
 */
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    AppRegistry,
    Dimensions,
    ScrollView,
    View,
    Image
} from 'react-native';

var {width,height} = Dimensions.get('window');
import trigon from '../img/trigon.png';

export default class Popup extends Component {


  constructor() {
    super();
    this.state = {
      x: width + 100,
      y: height + 100
    }
  }

  measure(callback){
    this.refs.popup.measure(callback);
  }

  show(x, y) {
    this.setState({
      x: x,
      y: y
    });
  }

  close() {
    y = height + 100;
    x = width + 100;
    this.setState({
      x: x,
      y: y
    });
  }

  render() {
    return (
          <View
              ref='popup'
              style={{flex:1,position:'absolute',left:this.state.x,top:this.state.y,alignItems:'center',backgroundColor:'transparent'}}>
            <View style={{borderRadius:10,backgroundColor:'white',marginBottom:-1}}>
              {this.props.children}
            </View>
            <Image source={trigon}/>
          </View>
    )
  }
}
