/**
 * Created by buhe on 2016/10/17.
 */

import React,{Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

var {height, width} = Dimensions.get('window');

import Pili, {
    Streaming,
    Player,
    StreamingConst
} from 'react-native-pili';

import { connect } from 'react-redux';

import toggle_camera from '../img/toggle-camera.png';
import audience from '../img/audience.png';
import face from '../img/face.png';
import set_icon from '../img/set-icon.png';
import share from '../img/share.png';

var zoom = 1;

class StreamingView extends Component {
  constructor() {
    super();
    this.state = {
      muted: false,
      started: true,
      text: '...',
      focus: true,
      zoom: 1,
      camera: 'front'
    };
    this.stop = this.stop.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  stop() {
    this.props.navigator.pop();
  }

  toggleCamera() {
    if (this.state.camera === 'front') {
      this.setState({camera: 'back'});
    } else {
      this.setState({camera: 'front'});
    }

  }

  render() {
    return (
        <View>
          <Streaming
              rtmpURL={this.props.rooms.currentRoom.publish}
              style={{
                      position:'absolute',
                      top:0,left:0,
                                    height:height,
                                    width:width,
                                  }}
              zoom={this.state.zoom}
              focus={this.state.focus}
              profile={{
                            video:{
                              fps:30,
                              bps:1000 * 1024,
                              maxFrameInterval:48
                            },
                            audio:{
                              rate:44100,
                              bitrate:96 * 1024
                            },
                            encodingSize:StreamingConst.encodingSize._480
                          }}
              started={this.state.started}
              camera={this.state.camera}
              onReady={()=>this.setState({text: "onReady"})} //onReady event
              onConnecting={()=>this.setState({text: "onConnecting"})} //onConnecting event
              onStreaming={()=>this.setState({text: "onStreaming"})} //onStreaming event
              onShutdown={()=>this.setState({text: "onShutdown"})} //onShutdown event
              onIOError={()=>this.setState({text: "onIOError"})} //onIOError event
              onDisconnected={()=>this.setState({text: "onDisconnected"})} //onDisconnected event
              />
          <View style={{backgroundColor:'black',flexDirection:'row'}}>
            <TouchableOpacity onPress={this.stop}>
              <View
                  style={{
                  marginTop:12,marginBottom:12,
                  marginLeft:30,marginRight:30,width:200,height:44,backgroundColor:'rgba(237, 87, 87, 1)',
                  justifyContent:'center',alignItems:'center',
                  borderRadius:22
                  }}
                  >
                <Text style={{color:'white'}}>Stop Broadcasting</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleCamera}>
              <View
                  style={{backgroundColor:'white',borderRadius:20,justifyContent:'center',alignItems:'center',width:44,height:44,marginTop:12,marginBottom:12,}}>
                <Image source={toggle_camera}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{top:height-44,height:44,width:width - 20,
          position:'absolute',borderStyle:'solid',borderTopColor:'white',
          marginLeft:10,marginRight:10,
          borderTopWidth:1,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
          }}>
            <View style={{flexDirection:'row'}}>
              <Image source={audience}/>
              <Text style={{color:'white',backgroundColor:'transparent'}}>123</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Image source={face}/>
              <Image source={set_icon}/>
              <Image source={share}/>
            </View>
          </View>
        </View>
    );
  }

  zoom1() {
    zoom = zoom + 1;
    if (zoom < 0) {
      zoom = 1;
    }
    this.setState({zoom: zoom});
  }

  zoom2() {
    zoom = zoom - 1;
    if (zoom < 0) {
      zoom = 1;
    }
    this.setState({zoom: zoom});
  }

  onState() {
    this.setState({text: "loading"});
  }

  start() {
    this.setState({
      started: !this.state.started
    });
  }

  mute() {
    this.setState({
      muted: !this.state.muted
    });
  }
}

export default connect(({rooms}) => ({rooms}))(StreamingView);