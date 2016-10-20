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

import Popup from '../widgets/popup';

import toggle_camera from '../img/toggle-camera.png';
import audience from '../img/audience.png';
import face from '../img/face.png';
import set_icon from '../img/set-icon.png';
import share from '../img/share.png';

import beauty from '../img/beauty.png';
import beauty_red from '../img/beauty-red.png';

import mirror from '../img/mirror.png';
import mirror_red from '../img/mirror-red.png';

var zoom = 1;

class PopupItem extends Component {
  render() {
    let icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
    let label = this.props.selected
        ? <Text style={{color:'red',marginLeft:10}}>{this.props.text}</Text>
        : <Text style={{marginLeft:10}}>{this.props.text}</Text>;
    return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{flexDirection:'row',padding:20}}>
            {icon}
            {label}
          </View>
        </TouchableOpacity>

    )
  }
}

class StreamingView extends Component {

  _set_icon_size = {}

  constructor() {
    super();
    this.state = {
      muted: false,
      started: true,
      text: '...',
      focus: true,
      zoom: 1,
      camera: 'front',
      beauty: false,
      mirror: false
    };
    this.stop = this.stop.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
    this.measureSetIcon = this.measureSetIcon.bind(this);
    this.toggleBeauty = this.toggleBeauty.bind(this);
    this.toggleMirror = this.toggleMirror.bind(this);
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

  measureSetIcon() {
    var self = this;
    this.refs.set_icon_button.measure((fx, fy, width, height, px, py) => {
      self.popupDialog.measure((fx, fy, popup_width, popup_height) => {
        let x = px - (popup_width / 2);
        let y = py - popup_height - 20;
        self._set_icon_size = {x: x, y: y};
      })
    })
  }

  toggleBeauty(){
    this.setState({beauty:!this.state.beauty});
  }

  toggleMirror(){
    this.setState({mirror:!this.state.mirror});
  }

  componentDidMount() {
    setTimeout(this.measureSetIcon, 1000);
  }

  render() {
    return (
        <View>
          <Streaming
              //rtmpURL={"rtmp://pili-publish.pilitest.qiniucdn.com/pilitest/buhe_02?key=6eeee8a82246636e"}
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
              <TouchableOpacity style={styles.button}><Image source={face}/></TouchableOpacity>
              <TouchableOpacity
                  style={styles.button}
                  ref='set_icon_button'
                  onPress={()=>{this.popupDialog.show(this._set_icon_size.x,this._set_icon_size.y)}}
                  >
                <Image source={set_icon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}><Image source={share}/></TouchableOpacity>
            </View>
          </View>
          <Popup
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              >
            <PopupItem
                selected={this.state.beauty}
                selectedIcon={<Image source={beauty_red}/>}
                icon={<Image source={beauty}/>}
                text='美颜'
                onPress={this.toggleBeauty}
                />
            <PopupItem
                selected={this.state.mirror}
                selectedIcon={<Image source={mirror_red}/>}
                icon={<Image source={mirror}/>}
                text='镜像'
                onPress={this.toggleMirror}
                />

          </Popup>
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

const styles = StyleSheet.create({
  button: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default connect(({rooms}) => ({rooms}))(StreamingView);