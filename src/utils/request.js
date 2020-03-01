import axios from 'axios'


const service = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 15000
})

service.interceptors.request.use(
  config => { return config}
)

service.interceptors.response.use(
  response => { return response.data },
  error => { return Promise.reject(error) }
)

export default service