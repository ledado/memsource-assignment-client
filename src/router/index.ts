import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import {errorBus} from '@/service/events/ErrorBus';
import {layoutTypes} from '@/layouts/layoutTypes';
import {routerTypes} from '@/router/routerTypes';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: routerTypes.MAIN,
    component: () => import('../views/Main.vue'),
    meta: {
      layout: layoutTypes.DEFAULT,
    },
  },
  {
    path: '/project/new',
    name: routerTypes.PROJECT_NEW,
    component: () => import('../views/Project/MainProjectCreate.vue'),
    meta: {
      layout: layoutTypes.DEFAULT,
    },
  },
  {
    path: '/project/:id',
    name: routerTypes.PROJECT_UPDATE,
    component: () => import('../views/Project/MainProjectUpdate.vue'),
    meta: {
      layout: layoutTypes.DEFAULT,
    },
    props: true,
  },
  {
    path: '*',
    component: () => import('../views/Error/Error404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// error state clean up
router.afterEach((to, from) => {
  if (from.name && errorBus.state) {
    errorBus.errorCode = undefined;
    errorBus.state = false;
  }
});

export default router;
