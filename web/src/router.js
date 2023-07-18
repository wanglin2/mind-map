import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPage from '@/pages/Edit/Index'
import DocPage from '@/pages/Doc/Index'
import routerList from '@/pages/Doc/routerList'
import WorkbenchePage from '@/pages/Workbenche/Index'
import WorkbencheHomePage from '@/pages/Workbenche/views/Home'
import WorkbencheEditPage from '@/pages/Workbenche/views/Edit'
import IndexPage from '@/pages/Index/Index'

// 处理没有翻译的章节路由
const handleRouterList = () => {
  let zhList = routerList[0].children
  for(let i = 1; i < routerList.length; i++) {
    let list = routerList[i].children
    zhList.forEach(item => {
      if (!list.find((item2) => {
        return item2.path === item.path
      })) {
        list.push({
          ...item,
          lang: 'zh'
        })
      }
    })
  }
}
handleRouterList()

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
  {
    path: '/index', 
    name: 'Index', 
    component: IndexPage 
  },
  { 
    path: '/', 
    name: 'Edit', 
    component: EditPage 
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
          component: () => import(`./pages/Doc/${child.lang || item.lang}/${child.path}/index.vue`)
        }
      })
    }
  })
]

const router = new VueRouter({
  routes
})

export default router
