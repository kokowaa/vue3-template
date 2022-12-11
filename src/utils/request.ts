/** axios请求 */
import axios from "axios";
import type { AxiosError } from "axios"

/** axios实例 */
const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  }
});

/** 请求拦截 */
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.reject(error)
  }
)

/** 响应拦截 */
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError) => {
    const { response } = error;
    const msg = errorHandler(response?.status || 0);

    return Promise.reject(msg)
  }
)

/** 错误处理函数 */
function errorHandler(state: number) {
  let message = ''
  switch (state) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return message
}

export default service;