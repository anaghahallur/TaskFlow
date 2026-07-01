import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskflow-c1pa.onrender.com/api/v1',
  withCredentials: true, // Important for sending/receiving HTTP-only cookies
});

export default api;
