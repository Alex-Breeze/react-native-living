/**
 * Created by buhe on 2016/10/11.
 */

import {
    createRouter,
    NavigationProvider,
} from '@exponent/ex-navigation';

import Rooms from './Rooms';
import CreateRoom from './createRoom';
import AboutScreen from './AboutScreen';
import Streaming from './Streaming';
import Player from './Player';
export default Router = createRouter(() => ({
  home: () => Rooms,
  about: () => AboutScreen,
  createRoom: ()=>CreateRoom,
  streaming: ()=>Streaming,
  player: ()=>Player,
}));
