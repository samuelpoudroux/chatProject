import {getUserProfile} from '../../../repository/user';
import {handleExceptions} from '../../../helpers/error';

export const SET_LOADING = 'SET_LOADING_USER_PROFILE';
export const SET_ERROR = 'SET_ERROR_USER_PROFILE';
export const SET_DATA = 'SET_DATA_USER_PROFILE';

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
 * récupère l'utilisateur courant connecté
 */
export const fetchUserProfile = (params) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const user = await getUserProfile(params);
    dispatch(setData(user));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(new Error('Erreur lors de la récupération de l\'utilisateur courant')));
    handleExceptions(err);
  }
};
