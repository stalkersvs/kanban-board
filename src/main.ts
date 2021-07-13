import Vue from 'vue';
import Api from '@/api/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$api = new Api();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
