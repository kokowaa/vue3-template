import service from "@/utils/request";
import type { AxiosRequestConfig } from "axios";

/** Axios请求 */
export default function useHttp(config: AxiosRequestConfig): Promise<any> {
  return new Promise(r => {
    try {
      service(config).then(res => {
        r([undefined, res])
      }).catch(error => {
        r([error])
      })
    } catch (e) {
      r([e])
    }
  })
}