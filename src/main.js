import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**  **/
import axios from 'axios'
// import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import moment from "vue-moment"
import VueYoutube from 'vue-youtube'
//import VeeValidate from 'vee-validate'
import * as VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'

/*bus && filter */
import './bus';
import currencyFilter from './filters/currency';

/*fontawesome*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAsterisk,faCartPlus,faSpinner,faTrashAlt,faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAsterisk,faCartPlus,faSpinner,faTrashAlt,faCompactDisc)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.use(VueAxios, axios);
Vue.prototype.$http = axios;

Vue.use(VeeValidate);
Vue.use(VueYoutube);

VeeValidate.Validator.localize('zh_TW',zhTWValidate);
axios.defaults.withCredentials = true;

Vue.component('Loading',Loading);

Vue.filter('currency',currencyFilter);
Vue.use(moment);

Vue.prototype.$Moment = moment;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
