import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://one10524redboost.onrender.com',
  withCredentials: true, // Important for sessions
})

export default axiosInstance
