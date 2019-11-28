import {register} from '../../../repository/user';
import {handleExceptions} from '../../../helpers/error';

export const SET_LOADING = 'SET_LOADING_CREATE_USER';
export const SET_ERROR = 'SET_ERROR_CREATE_USER';
export const SET_DATA = 'SET_DATA_CREATE_USER';

export const setLoading = loading => {
  return {
    type: SET_LOADING,
    value: loading
  };
};

export const setError = error => {
  return {
    type: SET_ERROR,
    value: error
  };
};

export const setData = data => {
  return {
    type: SET_DATA,
    value: data
  };
};

/**
 * créé un user
 */
export const registerUser = (user, history) => async dispatch => {
  try {
    dispatch(setData(null));
    dispatch(setLoading({
        loading: true,
    }));
    await register(user, history);
    dispatch(setData(true));
    dispatch(
      setLoading({
        data: false,
      })
    );
  } catch (err) {
    dispatch(
      setLoading({
        data: false,
      })
    );
    dispatch(setError(err));
    handleExceptions(err);
  }
};


