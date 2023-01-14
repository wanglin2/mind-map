const data = {
  pageCatalog: {
    zh: '本页目录',
    en: 'Page catalog'
  },
  demo: {
    zh: '在线示例',
    en: 'Online Demo'
  }
}

const t = (str, lang) => {
  return data[str] ? data[str][lang] || data[str].zh : ''
}
export default t
