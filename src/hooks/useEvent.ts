import { getCurrentInstance } from "vue";

/** 全局事件总线 */
export default function useEvent() {
  const appContext = getCurrentInstance();
  return appContext?.appContext?.app?.config?.globalProperties?.$event;
}
