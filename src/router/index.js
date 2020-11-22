import Vue from 'vue';
import VueRouter from 'vue-router';
import Colors from '@/views/Colors';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Colors',
    component: Colors,
  },
  {
    path: '/validation-form',
    name: 'ValidationForm',
    component: () => import('@/views/ValidationPage'),
  },
  {
    path: '/jokes',
    name: 'Jokes',
    component: () => import('@/views/Jokes'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
