/**
 * Created by buhe on 2016/10/11.
 */
'use strict';
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    AppRegistry,
    Dimensions,
    ScrollView,
    ActivityIndicatorIOS,
    Animated,
    TouchableOpacity
} from 'react-native'
import {
    Heading,
    View,
    Tile,
    Text,
    Title,
    Subtitle,
    Caption,
    Icon,
    Overlay,
    Button,
    TextInput,
    NavigationBar,
    Screen,
    ListView,
    Row,
    Divider,
    Image,
} from '@shoutem/ui';

var {height, width} = Dimensions.get('window');

import { connect } from 'react-redux';

import { rooms,createRoom } from '../../actions/rooms';

import { withNavigation } from '@exponent/ex-navigation';

import NoRoom from './NoRoom'
import covers from './Covers';

import user from '../../img/user.png';
import add_button from '../../img/add-button.png'

var offsetY = 0;
var listViewcontentHeight = 0;

@withNavigation class RoomsView extends Component {

  constructor(props) {
    super(props);
    props.fetchRooms();
    //console.log(props.rooms);

    this.state = {
      commentButtonTop: new Animated.Value(height - 150),
    }
    this.hideButton = this.hideButton.bind(this);
    this.showButton = this.showButton.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.openPlayer = this.openPlayer.bind(this);
  }

  showButton(){
    Animated.timing(          // Uses easing functions
        this.state.commentButtonTop,    // The value to drive
        {toValue: height - 150, duration: 100}
    ).start();
  }
  hideButton(){
    Animated.timing(          // Uses easing functions
        this.state.commentButtonTop,    // The value to drive
        {toValue: height, duration: 100}           // Configuration
    ).start();
  }

  _onScroll(event){
    var y = event.nativeEvent.contentOffset.y;
    if(y > 0 && y < listViewcontentHeight){
      if (y < offsetY) {
        this.showButton();
        offsetY = y;
      } else {
        this.hideButton();
        offsetY = y;
      }
    }
  }

  openPlayer(url) {
    this.props.navigator.push(Router.getRoute('player',{url: url}));
  }

  createRoom(){
    this.props.navigator.push(Router.getRoute('createRoom'));
  }

  render() {
    return (
        <View style={{flex:1}}>
            <ListView
                onContentSizeChange={(contentWidth, contentHeight)=>{listViewcontentHeight = contentHeight}}
                data={this.props.rooms.data}
                onScroll={this._onScroll}
                scrollEventThrottle={20}
                //loading={false}
                //onLoadMore={...}
                //onRefresh={...}
                //renderFooter={()=>{return <Divider styleName="line" />}}
                //renderHeader={...}
                renderRow={item => { return (
                                      <TouchableOpacity onPress={()=>{this.openPlayer(item.play.ORIGIN)}}>
                                        <Image
                                          style={{height:220,width:width,justifyContent:'flex-start',alignItems:"flex-start"}}
                                          //styleName="small rounded-corners"
                                          source={covers.next()}
                                        >
                                        <Text style={{color:'white',fontSize:26,marginTop:32,marginLeft:16,marginBottom:100}}>{item.play.ORIGIN}</Text>
                                         <View style={{flexDirection:'row',marginLeft:16,alignItems:'center'}}>
                                          <Image
                                            styleName="small-avatar"
                                            source={user}
                                          />
                                          <Text style={{color:'white',fontSize:16,marginLeft:9}} >Aape</Text>
                                         </View>
                                        </Image>
                                        </TouchableOpacity>
                                  )}}
                //renderSectionHeader={()=>{return <Divider styleName="line" />}}

                />

          <Animated.View
              style={{
                        position: 'absolute',
                        top: this.state.commentButtonTop,
                        width:width,
                        alignItems: 'center'
              }}
              >
            <TouchableOpacity onPress={this.createRoom}>
              <Image source={add_button} style={{backgroundColor:'transparent',}}/>
            </TouchableOpacity>
          </Animated.View>
        </View>

        )
  }
}

function bindAction(dispatch) {
  return {
    fetchRooms: () => dispatch(rooms()),
  }
}

export default connect(({rooms}) => ({rooms}), bindAction)(RoomsView);