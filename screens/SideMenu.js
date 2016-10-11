/**
 * Created by buhe on 2016/10/11.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import user from '../img/user.png';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.container}>
          <Image source={user} style={{marginTop:39 + 44,marginBottom:13}}/>
          <Text style={styles.title}>Linda</Text>

          <TouchableOpacity onPress={ this.onReplaceTab2Press.bind(this) }>
            <Text style={styles.button}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ this.onModalPress.bind(this) }>
            <Text style={styles.button}>测试</Text>
          </TouchableOpacity>
        </View>
    );
  }
  onReplaceTab2Press() {
    this._toggleDrawer();
  }

  onModalPress() {
    this._toggleDrawer();
    //this.props.navigator.showModal({
    //  title: "Modal",
    //  screen: "example.ModalScreen"
    //});
  }

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    //justifyContent: 'center',
    //width: 300
  },
  title: {
    //textAlign: 'left',
    fontSize: 18,
    marginBottom: 40,
    color:'white'
    //marginTop:10,
    //fontWeight: '500'
  },
  button: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    marginTop:10,
    color:'white'
  }
});