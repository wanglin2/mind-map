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
let CourseList = new Array(25).fill(0).map((_, index) => {
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
  'nodeImgAdjust',
  'search',
  'painter',
  'scrollbar',
  'formula',
  'cooperate',
  'xmind',
  'markdown',
  'utils'
]
let helpList = new Array(5).fill(0).map((_, index) => {
  return 'help' + (index + 1)
})

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
      type: 'doc',
      list: createList('zh', StartList)
    },
    {
      groupName: '教程',
      type: 'doc',
      list: createList('zh', CourseList)
    },
    {
      groupName: 'API',
      type: 'doc',
      list: createList('zh', APIList)
    },
    {
      groupName: '使用帮助',
      type: 'help',
      list: createList('zh', helpList)
    }
  ],
  en: [
    {
      groupName: 'Start',
      type: 'doc',
      list: createList('en', StartList)
    },
    {
      groupName: 'Course',
      type: 'doc',
      list: createList('zh', CourseList)
    },
    {
      groupName: 'API',
      type: 'doc',
      list: createList('en', APIList)
    }
  ]
}

export {
  langList
}