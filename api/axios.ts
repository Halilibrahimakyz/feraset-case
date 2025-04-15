import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 120000, // 120 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
}); 