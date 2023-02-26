import { createRouter, createWebHashHistory } from "vue-router";
import { useStore } from "../store/index";
export const routes = [
  {
    path: "/",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/Welcome",
    component: () => import("../views/Welcome.vue"),
  },
  {
    path: "/Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/404",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = useStore();
  if (to.path == "/") {
    if (!user.userInfo) {
      next("/Welcome"); //未登录
    } else {
      next(); //已登陆
    }
    return;
  }
  next(); //不需要拦截的路由，直放行
});

export default router;
