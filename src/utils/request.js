import axios from 'axios'
import { message } from 'antd'
import { BASE_URL } from '../config/index'
import NProgress from 'nprogress'
import store from '../redux/store'
import { deleteUserInfo } from '../redux/actions/login_action'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    NProgress.start()
    var token = store.getState().userInfo.token;
    token && (config.headers.Authorization = token)
    // config.headers['UserId'] = getUserId()
    return config
  },
  err => Promise.reject(err)
)

service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    if(error.response.status === 401) {
      message.error("身份验证失败。请重新登录")
      store.dispatch(deleteUserInfo())
    }else {
      message.error(error.message)
    }
    return new Promise(() => {})
  }
)

export default service