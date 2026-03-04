import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { parseSmmFileContent, setFileSheets } from '@/api'

// PWA 从“打开方式”打开文件时：先预读文件并写入 store/api，再挂载应用，避免先渲染 localStorage 再渲染文件导致闪两次
const launchSettled = new Promise(resolve => {
  if (typeof window === 'undefined' || !('launchQueue' in window)) {
    resolve()
    return
  }
  const timeout = setTimeout(resolve, 120)
  window.launchQueue.setConsumer(async launchParams => {
    clearTimeout(timeout)
    if (launchParams?.files?.length) {
      try {
        const file = await launchParams.files[0].getFile()
        const text = await file.text()
        const parsed = parseSmmFileContent(text)
        if (parsed) {
          store.commit('setIsHandleLocalFile', true)
          setFileSheets(parsed)
          store.commit('setPendingPwaFileHandle', launchParams.files[0])
        }
      } catch (e) {}
    }
    resolve()
  })
})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon-font/iconfont.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import i18n from './i18n'
import { getLang } from '@/api'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

// 构建时间（打包时注入），便于在控制台确认是否为最新版本
if (typeof __BUILD_TIME__ !== 'undefined') {
  console.log('[思绪思维导图] 构建时间:', __BUILD_TIME__)
}

Vue.config.productionTip = false
const bus = new Vue()
Vue.prototype.$bus = bus
Vue.use(ElementUI)
Vue.use(VueViewer)

const initApp = () => {
  i18n.locale = getLang()
  new Vue({
    render: h => h(App),
    router,
    store,
    i18n
  }).$mount('#app')
}

// 注册 Service Worker（满足 PWA 可安装条件，Chrome 会显示“安装”提示）
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const base = (window.externalPublicPath || process.env.BASE_URL || '/').replace(/\/?$/, '') + '/'
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(base + 'sw.js').catch(() => {})
  })
}

// 等 PWA 启动文件处理就绪后再挂载，避免先渲染 localStorage 再渲染文件
launchSettled.then(() => {
  if (window.takeOverApp) {
    window.initApp = initApp
    window.$bus = bus
  } else {
    initApp()
  }
})
