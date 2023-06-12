import routerList from './routerList'

let langList = [
  {
    name: '中文',
    path: 'zh'
  },
  {
    name: 'English',
    path: 'en'
  }
]
let StartList = ['introduction', 'start', 'deploy', 'client', 'translate', 'changelog']
let CourseList = new Array(19).fill(0).map((_, index) => {
  return 'course' + (index + 1)
})
let APIList = [
  'constructor',
  'node',
  'render',
  'view',
  'keyCommand',
  'command',
  'batchExecution',
  'richText',
  'select',
  'drag',
  'keyboardNavigation',
  'doExport',
  'miniMap',
  'watermark',
  'associativeLine',
  'touchEvent',
  'xmind',
  'markdown',
  'utils'
]

const createList = (lang, list) => {
  let langRouter = routerList.find(item => {
    return item.lang === lang
  })
  let children = langRouter.children
  return list
    .filter(item => {
      return children.find(child => {
        return child.path === item
      })
    })
    .map(item => {
      return {
        path: item,
        name: children.find(child => {
          return child.path === item
        }).title
      }
    })
}

export default {
  zh: [
    {
      groupName: '开始',
      list: createList('zh', StartList)
    },
    {
      groupName: '教程',
      list: createList('zh', CourseList)
    },
    {
      groupName: 'API',
      list: createList('zh', APIList)
    }
  ],
  en: [
    {
      groupName: 'Start',
      list: createList('en', StartList)
    },
    {
      groupName: 'Course',
      list: createList('zh', CourseList)
    },
    {
      groupName: 'API',
      list: createList('en', APIList)
    }
  ]
}

export {
  langList
}