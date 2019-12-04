import {combineReducers} from 'redux';

import register from './register';
import login from './login';
import socket from './'


export default combineReducers({
  register, login,
});
