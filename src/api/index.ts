import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type { ResultData } from "./interface";
import axios from "axios";
import router from "@/router";
import { RequestEnum, ResponseEnum } from "@/enums/httpEnum";
import { NMessage } from "@/utils";
import { errorHandler } from "./helper/errorHandler";  

/**
 * @description 请求配置
 */
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseUrl: import.meta.env.VITE_SERVER_API as string,
  // 设置超时时间（10s）
  timeout: RequestEnum.TIMEOUT as number,
  // header
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
    // get: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    // },
    // post: {
    //   'Content-Type': 'application/json;charset=utf-8'
    //   // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    // }
  },
	// 跨域时候允许携带凭证
	withCredentials: true
}

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        return { ...config, headers: { token } };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    )

    /**
     * @description 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        const message = NMessage();
        // * 登陆失效（code == 599）
        if (data.code == RequestEnum.OVERDUE) {
          message.error('登陆失效');
          localStorage.setItem('token', '');
          router.replace('/login');
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResponseEnum.SUCCESS) {
          message.error(data?.msg || '请求错误');
          return Promise.reject(data);
        }
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        const message = NMessage();
        // 请求超时单独判断，因为请求超时没有 response
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时！请您稍后重试');
        // 错误处理
        if (response) errorHandler(response.status)
        return Promise.reject(error);
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, {params, ..._object});
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, {params, ..._object});
  }
  download<T>(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, _object);
  }
}

export default new RequestHttp(config);