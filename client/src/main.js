import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import router from './router'

import { BootstrapVue } from 'bootstrap-vue'
import './assets/scss/app.scss'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
