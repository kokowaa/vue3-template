import http from "@/api";
import { Login } from "../interface";

/** 登录 */
export const loginAPI = (params: Login.ReqLogin) => {
  return http.post<Login.ResLogin>("/login", params);
};
