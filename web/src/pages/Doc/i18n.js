const data = {
  pageCatalog: {
    zh: '本页目录',
    en: 'Page catalog'
  },
  demo: {
    zh: '在线示例',
    en: 'Online Demo'
  },
  help: {
    zh: '帮助文档',
    en: 'Help doc'
  },
  dev: {
    zh: '开发文档',
    en: 'Dev doc'
  },
  index: {
    zh: '首页',
    en: 'Home'
  },
}

const t = (str, lang) => {
  return data[str] ? data[str][lang] || data[str].zh : ''
}
export default t
