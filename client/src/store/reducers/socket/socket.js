import {SET_USER, SET_MESSAGE} from '../../actions/socket/socket';

const initialState = {
  messages: [],
  userConnected: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userConnected: action.value,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.value,
      };
    default:
      return state;
  }
};
