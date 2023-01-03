import { createRouter, createWebHashHistory } from "vue-router";
import view_routers from './view_router';
const routes = [...view_routers];

// 滚动行为
const scrollBehavior = () => {
  return {
    el: '#app',
    top: 0,
    behavior: 'smooth',
  };
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior
});

export default router;
