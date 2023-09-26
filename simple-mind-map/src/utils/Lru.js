// LRU缓存类
export default class Lru {
  constructor(max) {
    this.max = max || 1000
    this.size = 0
    this.pool = new Map()
  }

  add(key, value) {
    // 如果该key是否已经存在，则先删除
    this.delete(key)
    this.pool.set(key, value)
    this.size++
    // 如果数量超出最大值，则删除最早的
    if (this.size > this.max) {
      let keys = this.pool.keys()
      let last = keys.next()
      this.delete(last.value)
    }
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
}
