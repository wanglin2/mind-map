import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPage from '@/pages/Edit/Index'

Vue.use(VueRouter)

const routes = [{ path: '/', name: 'Edit', component: EditPage }]

const router = new VueRouter({
  routes
})

export default router
