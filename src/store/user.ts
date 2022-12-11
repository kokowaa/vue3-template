import { defineStore } from "pinia";

/** Store: 用户信息 */
const useUser = defineStore('user', {
  state: () => ({
    name: '张林'
  }),
  actions: {

  }
});

export default useUser;