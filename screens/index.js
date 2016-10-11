/**
 * Created by buhe on 2016/10/11.
 */

import {Navigation} from 'react-native-navigation';

import Rooms from './Rooms';
import SideMenu from './SideMenu';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('Rooms', () => Rooms);
  Navigation.registerComponent('SideMenu', () => SideMenu);
}
