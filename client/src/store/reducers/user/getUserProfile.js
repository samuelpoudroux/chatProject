import {SET_DATA, SET_ERROR, SET_LOADING} from '../../actions/user/getUserProfile';

const initialState = {
  data: null,
  error: null,
  loading: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.value
      };
    case SET_DATA:
      return {
        ...state,
        data: action.value
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.value
      };
    default:
      return state;
  }
};
