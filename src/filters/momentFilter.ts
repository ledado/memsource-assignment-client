import Vue from 'vue';

Vue.filter('formatDate', (value: any, format: string) => {
  if (value) {
    return Vue.prototype.$moment(value).format(format);
  }
});
