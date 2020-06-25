import axios from 'axios';

const axiosJson = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosJson;
