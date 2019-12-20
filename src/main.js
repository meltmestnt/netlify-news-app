import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCog, faSearch);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false
window.eventBus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
