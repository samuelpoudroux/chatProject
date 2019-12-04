
export const SET_USER = 'SET_USER';
export const SET_MESSAGE = 'SET_MESSAGE';

export const setUser = ( userConnected, user) => {
    const users = userConnected.slice()
    if(users.find(e => e.id !== user.id)) {
        console.log(userConnected)
        users.push(user)
    }

    return {
    type: SET_USER,
    value: users,
  };
};

export const setMessage = (messages, message) => {
  return {
    type: SET_MESSAGE,
    value: message,
  };
};


