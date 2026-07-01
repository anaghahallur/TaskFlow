import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api/v1',
  withCredentials: true, // Important for sending/receiving HTTP-only cookies
});

export default api;
