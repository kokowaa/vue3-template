import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

/** 路由配置 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/pages/home/index.vue")
  }
];

/** 路由实例 */
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;