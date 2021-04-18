import axios from 'axios';

export const axiosJson = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
