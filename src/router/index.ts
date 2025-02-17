import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Analyzer from '../views/Analyzer.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/analyzer', component: Analyzer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;