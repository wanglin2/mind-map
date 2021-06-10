import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexPage from '@/pages/Index/Index'
import EditPage from '@/pages/Edit/Index'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Index', component: IndexPage },
    { path: '/edit/:id', name: 'Edit', component: EditPage }
]

const router = new VueRouter({
    routes
})

export default router