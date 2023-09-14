import Vue from 'vue'
import VueRouter from 'vue-router'
import DocPage from '@/pages/Doc/Index'
import routerList from '@/pages/Doc/routerList'

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
    path: '/index', 
    name: 'Index', 
    component: () => import(`./pages/Index/Index.vue`)
  },
  { 
    path: '/', 
    name: 'Edit', 
    component: () => import(`./pages/Edit/Index.vue`) 
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
