import Vue from 'vue';

import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  theme: 'toasted-primary',
  position: 'bottom-center',
  duration: 5000,
  className: 'toasted-item',
});
