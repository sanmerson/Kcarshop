import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fullstack-curriculum.onrender.com',
  timeout: 5000,
});

export const apiKars = axios.create({
  baseURL: 'https://kenzie-kars.herokuapp.com',
  timeout: 5000,
});
