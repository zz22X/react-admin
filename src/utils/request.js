import axios from 'axios'
import { message } from 'antd'
import { BASE_URL } from '../config/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import {
//   getToken,
//   getUserId
// } from "./app"

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

service.interceptors.request.use(
  
  config => {
    NProgress.start()
    // config.headers['Tokey'] = getToken();
    // config.headers['UserId'] = getUserId()
    return config
  }
)

service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    message.error(error.message)
    return new Promise(() => {})
  }
)

export default service