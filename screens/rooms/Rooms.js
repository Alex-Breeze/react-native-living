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
    Image
} from '@shoutem/ui';

var {height, width} = Dimensions.get('window');

import { connect } from 'react-redux';

import { rooms } from '../../actions/rooms';

import { withNavigation } from '@exponent/ex-navigation';

import NoRoom from './NoRoom'
import covers from './Covers';

import user from '../../img/user.png';

@withNavigation class RoomsView extends Component {

  constructor(props) {
    super(props);
    props.fetchRooms();
    console.log(props.rooms);
  }

  openPlayer() {

  }

  render() {
    return (
        <ScrollView>
          <ListView
              data={this.props.rooms.data}
              //loading={false}
              //onLoadMore={...}
              //onRefresh={...}
              //renderFooter={()=>{return <Divider styleName="line" />}}
              //renderHeader={...}
              renderRow={item => { return (
                                        <Image
                                          style={{height:220,width:width,justifyContent:'flex-start',alignItems:"flex-start"}}
                                          //styleName="small rounded-corners"
                                          source={covers.next()}
                                        >
                                        <Text style={{color:'white',fontSize:26,marginTop:32,marginLeft:16,marginBottom:100}}>{item.title}</Text>
                                         <View style={{flexDirection:'row',marginLeft:16,alignItems:'center'}}>
                                          <Image
                                            styleName="small-avatar"
                                            source={user}
                                          />
                                          <Text style={{color:'white',fontSize:16,marginLeft:9}} >Aape</Text>
                                         </View>
                                        </Image>
                                  )}}
              //renderSectionHeader={()=>{return <Divider styleName="line" />}}
              //style={...}
              />
        </ScrollView>)
  }
}

function bindAction(dispatch) {
  return {
    fetchRooms: () => dispatch(rooms()),
  }
}

export default connect(({rooms}) => ({rooms}), bindAction)(RoomsView);