import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import moment from '@/plugins/moment';
import '@/plugins/toasted';
import '@/plugins/mixin';
import '@/filters/momentFilter';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import router from '@/router/index';
import i18n from '@/i18n';
import './registerServiceWorker';

moment.locale(i18n.locale);
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  vuetify,
  render: (h) => h(App),
  i18n,
  router,
}).$mount('#app');
