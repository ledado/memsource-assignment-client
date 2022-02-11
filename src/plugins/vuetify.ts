import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#F05545',
      },
    },
  },
});

Vue.use(Vuetify);

export default vuetify;
