import Vue from 'vue';
import {routerTypes} from '@/router/routerTypes';

Vue.mixin({
  data: () => {
    return {
      routerTypes,
    };
  },
});
