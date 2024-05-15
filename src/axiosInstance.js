import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://110524-redboost.vercel.app',
  withCredentials: true, // Important for sessions
})

export default axiosInstance
