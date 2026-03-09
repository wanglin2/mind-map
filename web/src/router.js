import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Edit',
    component: () => import(`./pages/Edit/Index.vue`)
  },
  {
    path: '/index',
    redirect: '/'
  },
  // PWA file_handlers 打开文件时跳转到编辑页，由 launchQueue 传递文件
  {
    path: '/open-file',
    redirect: '/'
  },
  {
    path: '/doc/zh',
    component: () => import(`./pages/Doc.vue`)
  }
]

const router = new VueRouter({
  routes
})

export default router
