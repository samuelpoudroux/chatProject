import axios from 'axios';

// const DOMAIN = process.env.REACT_APP_URL
// const API = process.env.REACT_APP_API
// const USER = process.env.REACT_APP_USER
// const REGISTER = process.env.REACT_APP_REGISTER
// const LOGIN = process.env.REACT_APP_LOGIN

const URLLOGIN = 'http://localhost:5000/api/user/login';
const URLREGISTER = 'http://localhost:5000/api/user/register';


export const login = async (user) => {
  const req = axios.post(URLLOGIN, user);
  const {data} = await req;
  return data;
};

export const register = async (user) => {
  const req = axios.post(URLREGISTER, user);
  const {data} = await req;
  return data;
};


