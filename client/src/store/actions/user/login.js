import {login} from '../../../repository/user';
import {handleExceptions} from '../../../helpers/error';
import setAuthToken from '../../../services/setAuthToken';
import jwt_decode from 'jwt-decode';

export const SET_LOADING = 'SET_LOADING_LOGIN_USER';
export const SET_ERROR = 'SET_ERROR_LOGIN_USER';
export const SET_DATA = 'SET_DATA_LOGIN_USER';
export const SET_CURRENT_USER = 'SET_CURENT_USER_LOGIN_USER';


export const setLoading = loading => {
  return {
    type: SET_LOADING,
    value: loading
  };
};

export const setData = data => {
  return {
    type: SET_DATA,
    value: data
  };
};

export const setError = error => {
  return {
    type: SET_ERROR,
    value: error
  };
};


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        value: decoded
    }
}

/**
 * créé un user
 */
export const loginUser = (user, history) => async dispatch => {
  try {
    dispatch(setLoading({
        loading: true,
    }));
    const data = await login(user, history)
    const { token } = data;
    if(data.errors) {
    dispatch(setError(data.errors))
    }
    
    // localStorage.setItem('jwtToken', token);
    // setAuthToken(token);
    // const decoded = jwt_decode(token);
    // dispatch(setCurrentUser(decoded));
    // dispatch(setLoading({ loading: false }));
  } catch (err) {
    console.log("error du catch", err)
    dispatch(
      setLoading({
        loading: false,
      })
    );
    handleExceptions(err);
  }
};

export const logoutUser = (history) => async dispatch => {
  try {
    dispatch(setData(null));
    dispatch(setLoading({
        loading: true,
    }));
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
    dispatch(
      setLoading({
        loading: false,
      })
    );
  } catch (err) {
    dispatch(
      setLoading({
        loading: false,
      })
    );
    dispatch(setError(err));
    handleExceptions(err);
  }
};
