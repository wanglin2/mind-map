import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon-font/iconfont.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import i18n from './i18n'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(ElementUI)
Vue.use(VueViewer)

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
