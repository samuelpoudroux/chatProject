import axios from 'axios';

const url = '';

export const getUserProfile = async () => {
  const req = axios.get(url);
  const { data } = await req;
  return data;
};