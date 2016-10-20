/**
 * Created by buhe on 2016/10/18.
 */
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';

import {
    StackNavigation,
    DrawerNavigation,
    DrawerNavigationItem,
    NavigationProvider
} from '@exponent/ex-navigation';

import Router from './screens';

import { connect } from 'react-redux';

import user from './img/user.png';

// Treat the DrawerNavigationLayout route like any other route -- you may want to set
// it as the intiial route for a top-level StackNavigation

class DrawerNavigationLayout extends React.Component {
  render() {
    return (
        <NavigationProvider router={Router}>
          <StatusBar hidden={true}/>
          <DrawerNavigation
              id='main'
              initialItem='home'
              drawerWidth={200}
              renderHeader={this._renderHeader}
              drawerStyle={{backgroundColor:'black'}}
              >
            <DrawerNavigationItem
                id='home'
                //selectedStyle={styles.selectedItemStyle}
                renderTitle={()=><View style={{flex:1,alignItems:'center'}} ><Text style={styles.titleText} >直播</Text></View>}
                >
              <StackNavigation
                  id='home'
                  initialRoute={Router.getRoute('home')}
                  />
            </DrawerNavigationItem>

            <DrawerNavigationItem
                id='about'
                //selectedStyle={styles.selectedItemStyle}
                renderTitle={()=><View style={{flex:1,alignItems:'center'}}><Text style={styles.titleText}>设置</Text></View>}
                >
              <StackNavigation
                  id='about'
                  initialRoute={Router.getRoute('about')}
                  />
            </DrawerNavigationItem>

          </DrawerNavigation>
        </NavigationProvider>
    );
  }

  _renderHeader = () => {
    return (
        <View style={styles.header}>
          <Image source={user} style={{marginTop:39 + 44,marginBottom:13}}/>
          <Text style={styles.title}>Linda</Text>
        </View>
    );
  };

  _renderTitle(text:string, isSelected:boolean) {
    return (
        <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
          {text}
        </Text>
    );
  }

;
}

const styles = StyleSheet.create({
  header: {
    height: 276,
    flex:1,
    alignItems:'center'
  },


  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
    marginTop:5,
    color:'white',
  }
});

export default connect()(DrawerNavigationLayout);