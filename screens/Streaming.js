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

import { Button } from '@shoutem/ui';

import toggle_camera from '../img/toggle-camera.png';

var zoom = 1;

export default class StreamingView extends Component {
  constructor() {
    super();
    this.state = {
      muted: false,
      started: true,
      text: '...',
      focus: true,
      zoom: 1,
    };
    this.stop = this.stop.bind(this);
  }

  stop(){
    this.props.navigator.pop();
  }

  render() {
    return (
        <View>
          <Streaming
              rtmpURL={"rtmp://pili-publish.pilitest.qiniucdn.com/pilitest/buhe_02?key=6eeee8a82246636e"}
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
            <TouchableOpacity>
              <View style={{backgroundColor:'white',borderRadius:20,justifyContent:'center',alignItems:'center',width:44,height:44,marginTop:12,marginBottom:12,}}>
                <Image source={toggle_camera}/>
              </View>
            </TouchableOpacity>
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
