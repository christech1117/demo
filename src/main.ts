import '@/assets/scss/index.scss'; // global css
import SpectrumCssIcons from '@spectrum-css/icon/dist/spectrum-css-icons.svg';
import SpectrumIcons from '@adobe/spectrum-css-workflow-icons/dist/spectrum-icons.svg';
import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import '@spectrum-css/vars/dist/spectrum-global.css';

import '@spectrum-css/vars/dist/spectrum-medium.css';

import '@spectrum-css/vars/dist/spectrum-dark.css';

import '@spectrum-css/icon/dist/index-vars.css';
import '@spectrum-css/page/dist/index-vars.css';
import '@spectrum-css/typography/dist/index-vars.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
