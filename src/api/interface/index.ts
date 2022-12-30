// * 请求响应参数(不包含data)
export interface Result {
  message: string;
  status: number;
  success: boolean;
  timestamp: Date;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T;
}

// * 登录模块
export namespace Login {
  export interface ReqLogin {
    username: string;
    password: string;
  }
  export interface ResLogin {
    token: string;
  }
}
