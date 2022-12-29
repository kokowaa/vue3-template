// * NaiveUI 相关方法集合/导出
// import type { Messa } from "naive-ui";
import { useMessage } from "naive-ui";

/** 
 * @name 信息Message
 */
export function NMessage() {
  const message = useMessage();
  return message;
}