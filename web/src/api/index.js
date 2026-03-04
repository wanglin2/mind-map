import exampleData from 'simple-mind-map/example/exampleData'
import { simpleDeepClone } from 'simple-mind-map/src/utils/index'
import Vue from 'vue'
import vuexStore from '@/store'

const SIMPLE_MIND_MAP_DATA = 'SIMPLE_MIND_MAP_DATA'
const SIMPLE_MIND_MAP_SHEETS = 'SIMPLE_MIND_MAP_SHEETS'
const SIMPLE_MIND_MAP_CONFIG = 'SIMPLE_MIND_MAP_CONFIG'
const SIMPLE_MIND_MAP_LANG = 'SIMPLE_MIND_MAP_LANG'
const SIMPLE_MIND_MAP_LOCAL_CONFIG = 'SIMPLE_MIND_MAP_LOCAL_CONFIG'

let mindMapData = null

// 本地文件模式下，当前文件内的多 sheet 数据（打开/另存为时设置）
let fileSheets = null
let fileActiveIndex = 0

const createUid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2)

// 新格式版本号，用于 .smm 文件多 sheet 存储
export const SMM_VERSION = 2

/**
 * 解析 .smm 文件内容（与 Toolbar setData 逻辑一致），供 PWA 启动时在挂载前预加载，避免先渲染 localStorage 再渲染文件
 * @param {string} str - JSON 字符串
 * @returns {{ sheets: Array, activeIndex: number } | null}
 */
export const parseSmmFileContent = (str) => {
  try {
    const data = JSON.parse(str)
    if (typeof data !== 'object') return null
    if (data.smmVersion === SMM_VERSION && Array.isArray(data.sheets) && data.sheets.length > 0) {
      const sheets = data.sheets.map(s => ({
        id: s.id || 'sheet_' + Date.now(),
        name: s.name || '思维导图',
        data: s.data ? simpleDeepClone(s.data) : simpleDeepClone(exampleData)
      }))
      const activeIndex = Math.min(Math.max(0, data.activeIndex ?? 0), sheets.length - 1)
      return { sheets, activeIndex }
    }
    const fullData = data.root ? data : { ...exampleData, root: data }
    const sheets = [
      { id: 'sheet_' + Date.now(), name: '思维导图1', data: fullData }
    ]
    return { sheets, activeIndex: 0 }
  } catch (e) {
    return null
  }
}

// 本地文件模式：设置当前文件内的 sheets（打开文件或新建/另存为后调用）
export const setFileSheets = (payload) => {
  if (!payload || !payload.sheets || !payload.sheets.length) {
    fileSheets = null
    fileActiveIndex = 0
    return
  }
  fileSheets = payload.sheets.map(s => ({
    id: s.id || createUid(),
    name: s.name || '思维导图',
    data: s.data ? simpleDeepClone(s.data) : simpleDeepClone(exampleData)
  }))
  fileActiveIndex = Math.min(
    Math.max(0, parseInt(payload.activeIndex, 10) || 0),
    fileSheets.length - 1
  )
}

// 本地文件模式：获取当前文件内的 sheets（用于保存/另存为）
export const getFileSheets = () => {
  if (!vuexStore.state.isHandleLocalFile || !fileSheets || !fileSheets.length) {
    return null
  }
  return { sheets: fileSheets, activeIndex: fileActiveIndex }
}

// 多 sheet：获取所有 sheet 列表及当前激活下标（始终保证至少一个 sheet，以便底部栏显示）
export const getSheets = () => {
  if (window.takeOverApp) {
    const currentData = getData()
    return {
      sheets: [
        {
          id: 'single',
          name: '思维导图1',
          data: currentData || simpleDeepClone(exampleData)
        }
      ],
      activeIndex: 0
    }
  }
  if (vuexStore.state.isHandleLocalFile && fileSheets && fileSheets.length > 0) {
    return { sheets: fileSheets, activeIndex: fileActiveIndex }
  }
  if (vuexStore.state.isHandleLocalFile) {
    const currentData = getData()
    return {
      sheets: [
        {
          id: 'single',
          name: '思维导图1',
          data: currentData || simpleDeepClone(exampleData)
        }
      ],
      activeIndex: 0
    }
  }
  let raw = localStorage.getItem(SIMPLE_MIND_MAP_SHEETS)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (parsed.sheets && Array.isArray(parsed.sheets) && parsed.sheets.length > 0) {
        return {
          sheets: parsed.sheets,
          activeIndex: Math.min(
            Math.max(0, parseInt(parsed.activeIndex, 10) || 0),
            parsed.sheets.length - 1
          )
        }
      }
    } catch (e) {
      console.warn('getSheets parse error', e)
    }
  }
  // 兼容旧版：从单图数据迁移为多 sheet
  const legacy = localStorage.getItem(SIMPLE_MIND_MAP_DATA)
  let data = simpleDeepClone(exampleData)
  if (legacy) {
    try {
      data = { ...data, ...JSON.parse(legacy) }
    } catch (e) {}
  }
  const sheets = [
    { id: createUid(), name: '思维导图1', data: data }
  ]
  const payload = { sheets, activeIndex: 0 }
  localStorage.setItem(SIMPLE_MIND_MAP_SHEETS, JSON.stringify(payload))
  return payload
}

// 多 sheet：保存 sheet 列表及当前激活下标
export const setSheets = (payload) => {
  if (window.takeOverApp) return
  if (vuexStore.state.isHandleLocalFile) {
    if (payload && payload.sheets && payload.sheets.length > 0) {
      fileSheets = payload.sheets.map(s => ({
        id: s.id || createUid(),
        name: s.name || '思维导图',
        data: s.data ? simpleDeepClone(s.data) : simpleDeepClone(exampleData)
      }))
      fileActiveIndex = Math.min(
        Math.max(0, parseInt(payload.activeIndex, 10) || 0),
        fileSheets.length - 1
      )
    }
    return
  }
  try {
    localStorage.setItem(SIMPLE_MIND_MAP_SHEETS, JSON.stringify(payload))
  } catch (error) {
    console.log(error)
    if (String(error).indexOf('exceeded') !== -1) {
      Vue.prototype.$bus.$emit('localStorageExceeded')
    }
  }
}

// 获取当前激活的思维导图数据（当前 sheet）
export const getData = () => {
  if (window.takeOverApp) {
    mindMapData = window.takeOverAppMethods.getMindMapData()
    return mindMapData
  }
  if (vuexStore.state.isHandleLocalFile) {
    if (typeof Vue.prototype.getCurrentData === 'function') {
      return Vue.prototype.getCurrentData()
    }
    if (fileSheets && fileSheets.length > 0) {
      const sheet = fileSheets[fileActiveIndex]
      return sheet && sheet.data ? simpleDeepClone(sheet.data) : simpleDeepClone(exampleData)
    }
    return simpleDeepClone(exampleData)
  }
  const { sheets, activeIndex } = getSheets()
  if (!sheets.length) return simpleDeepClone(exampleData)
  const sheet = sheets[activeIndex]
  const data = sheet && sheet.data ? simpleDeepClone(sheet.data) : simpleDeepClone(exampleData)
  return data
}

// 存储当前 sheet 的思维导图数据
export const storeData = (data) => {
  try {
    if (vuexStore.state.isHandleLocalFile) {
      const originData = getData() || {}
      const merged = { ...originData, ...data }
      // 由 Edit 根据 this.sheets（完整列表）组包后 emit write_local_file，保证多 sheet 都被写入
      Vue.prototype.$bus.$emit('prepare_write_local_file', { merged })
      return
    }
    let originData = null
    if (window.takeOverApp) {
      originData = mindMapData || getData()
      if (!originData) originData = {}
      originData = { ...originData, ...data }
      mindMapData = originData
      window.takeOverAppMethods.saveMindMapData(originData)
      return
    }
    const { sheets, activeIndex } = getSheets()
    if (!sheets.length) return
    originData = getData()
    if (!originData) originData = {}
    originData = { ...originData, ...data }
    const nextSheets = sheets.slice()
    nextSheets[activeIndex] = {
      ...nextSheets[activeIndex],
      data: originData
    }
    setSheets({ sheets: nextSheets, activeIndex })
  } catch (error) {
    console.log(error)
    if (String(error).indexOf('exceeded') !== -1) {
      Vue.prototype.$bus.$emit('localStorageExceeded')
    }
  }
}

// 获取思维导图配置数据
export const getConfig = () => {
  if (window.takeOverApp) {
    window.takeOverAppMethods.getMindMapConfig()
    return
  }
  let config = localStorage.getItem(SIMPLE_MIND_MAP_CONFIG)
  if (config) {
    return JSON.parse(config)
  }
  return null
}

// 存储思维导图配置数据
export const storeConfig = config => {
  try {
    if (window.takeOverApp) {
      window.takeOverAppMethods.saveMindMapConfig(config)
      return
    }
    localStorage.setItem(SIMPLE_MIND_MAP_CONFIG, JSON.stringify(config))
  } catch (error) {
    console.log(error)
  }
}

// 存储语言
export const storeLang = lang => {
  if (window.takeOverApp) {
    window.takeOverAppMethods.saveLanguage(lang)
    return
  }
  localStorage.setItem(SIMPLE_MIND_MAP_LANG, lang)
}

// 获取存储的语言
export const getLang = () => {
  if (window.takeOverApp) {
    return window.takeOverAppMethods.getLanguage() || 'zh'
  }
  let lang = localStorage.getItem(SIMPLE_MIND_MAP_LANG)
  if (lang) {
    return lang
  }
  storeLang('zh')
  return 'zh'
}

// 存储本地配置
export const storeLocalConfig = config => {
  if (window.takeOverApp) {
    return window.takeOverAppMethods.saveLocalConfig(config)
  }
  localStorage.setItem(SIMPLE_MIND_MAP_LOCAL_CONFIG, JSON.stringify(config))
}

// 获取本地配置
export const getLocalConfig = () => {
  if (window.takeOverApp) {
    return window.takeOverAppMethods.getLocalConfig()
  }
  let config = localStorage.getItem(SIMPLE_MIND_MAP_LOCAL_CONFIG)
  if (config) {
    return JSON.parse(config)
  }
  return null
}
