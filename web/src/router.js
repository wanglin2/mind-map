import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPage from '@/pages/Edit/Index'
import DocPage from '@/pages/Doc/Index'
import routerList from '@/pages/Doc/routerList'
import WorkbenchePage from '@/pages/Workbenche/Index'
import WorkbencheHomePage from '@/pages/Workbenche/views/Home'
import WorkbencheEditPage from '@/pages/Workbenche/views/Edit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Edit',
    component: EditPage
  },
  {
    path: '/workbenche',
    name: 'Workbenche',
    component: WorkbenchePage,
    redirect: '/workbenche/home',
    children: [
      {
        path: 'home',
        name: 'WorkbencheHome',
        component: WorkbencheHomePage,
      },
      {
        path: 'edit/:id',
        name: 'WorkbencheEdit',
        component: WorkbencheEditPage,
      }
    ]
  },
  ...routerList.map((item) => {
    return {
      path: `/doc/${item.lang}/`,
      redirect: `/doc/${item.lang}/introduction/`
    }
  }),
  ...routerList.map((item) => {
    return {
      path: `/doc/${item.lang}/`,
      component: DocPage,
      children: item.children.map((child) => {
        return {
          path: `${child.path}/:h?`,
          component: () => import(`./pages/Doc/${item.lang}/${child.path}/index.vue`)
        }
      })
    }
  })
]

const router = new VueRouter({
  routes
})

export default router
