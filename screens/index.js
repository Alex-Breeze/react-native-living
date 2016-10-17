/**
 * Created by buhe on 2016/10/11.
 */

import {
    createRouter,
    NavigationProvider,
} from '@exponent/ex-navigation';

import Rooms from './Rooms';
import AboutScreen from './AboutScreen';
export default Router = createRouter(() => ({
  home: () => Rooms,
  about: () => AboutScreen,
}));
