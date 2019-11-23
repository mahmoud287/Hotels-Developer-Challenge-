import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

// for global components events communication
export const bus = new Vue()

new Vue({
  store,
  vuetify,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
