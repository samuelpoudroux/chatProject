import {SET_DATA, SET_ERROR, SET_LOADING, SET_CURRENT_USER} from '../../actions/user/login';
import isEmpty from '../../../services/isEmpty';


const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.value
      };
   
    case SET_LOADING:
      return {
        ...state,
        loading: action.value
      };

      case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.value),
            user: action.value
        }
    default:
      return state;
  }
};
