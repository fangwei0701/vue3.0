import { createRouter, createWebHashHistory } from "vue-router";
import { view_routers } from "./view_router";
const routes = [...view_routers];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});
