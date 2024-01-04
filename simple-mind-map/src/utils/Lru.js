// LRU缓存类
export default class Lru {
  constructor(max) {
    this.max = max || 1000
    this.size = 0
    this.pool = new Map()
  }

  add(key, value) {
    const isExist = this.has(key)
    // 如果该key之前不存在，并且现在数量已经超出最大值，则不再继续添加
    if (!isExist && this.size >= this.max) {
      return false
    }
    // 已经存在则可以更新，因为不影响数量
    // 如果该key是否已经存在，则先删除
    this.delete(key)
    // 添加
    this.pool.set(key, value)
    this.size++
    // 删除最早的没啥意义，详见：https://github.com/wanglin2/mind-map/issues/467
    // if (this.size > this.max) {
    //   let keys = this.pool.keys()
    //   let last = keys.next()
    //   this.delete(last.value)
    // }
    return true
  }

  delete(key) {
    if (this.pool.has(key)) {
      this.pool.delete(key)
      this.size--
    }
  }

  has(key) {
    return this.pool.has(key)
  }

  get(key) {
    if (this.pool.has(key)) {
      return this.pool.get(key)
    }
  }

  clear() {
    this.size = 0
    this.pool = new Map()
  }
}
