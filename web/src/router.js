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

// 创建路由列表
const createTypeRouterList = (type, redirectPath) => {
  return [
    ...routerList.map((item) => {
      return { 
        path: `/${type}/${item.lang}/`, 
        redirect: `/${type}/${item.lang}/${redirectPath}/`
      }
    }),
    ...routerList.map((item) => {
      return { 
        path: `/${type}/${item.lang}/`, 
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
}

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
  // 开发文档
  ...createTypeRouterList('doc', 'introduction'),
  // 帮助文档
  ...createTypeRouterList('help', 'help1')
]

const router = new VueRouter({
  routes
})

export default router
