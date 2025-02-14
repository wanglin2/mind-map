<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      currentChunk: '',
      controller: new AbortController(),
      content: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.postMsg()
      return
      const decoder = new TextDecoder()
      while (1) {
        const { done, value } = await res.read()
        if (done) {
          return
        }
        // 拿到当前切片的数据
        const text = decoder.decode(value)
        // 处理切片数据
        let chunk = this.handleChunkData(text)
        // 判断是否有不完整切片，如果有，合并下一次处理，没有则获取数据
        if (this.currentChunk) continue
        const list = chunk
          .split('\n')
          .filter(item => {
            return !!item
          })
          .map(item => {
            return JSON.parse(item.replace(/^data:/, ''))
          })
        list.forEach(item => {
          this.content += item.choices
            .map(item2 => {
              return item2.delta.content
            })
            .join('')
          console.log(this.content)
        })
      }
    },
    async postMsg() {
      const res = await fetch('http://localhost:3000/ai/chat', {
        signal: this.controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          a: '227d32b1-08aa-413d-9c12-6832c34bc59b',
          b: 'ep-20250214110611-hhf9z',
          messages: [
            {
              role: 'user',
              content:
                '帮我写一个【2025年前端学习计划】，需要以Markdown格式返回，因为我要导入思维导图软件进行使用，只需返回内容即可。'
            }
          ]
        })
      })
      if (res.status && res.status !== 200) {
        return false
      }
      return res.body.getReader()
    },
    handleChunkData(chunk) {
      chunk = chunk.trim()
      // 如果存在上一个切片
      if (this.currentChunk) {
        chunk = this.currentChunk + chunk
        this.currentChunk = ''
      }

      // 如果存在done,认为是完整切片且是最后一个切片
      if (chunk.includes('[DONE]')) {
        return chunk
      }

      // 最后一个字符串不为}，则默认切片不完整，保存与下次拼接使用（这种方法不严谨，但已经能解决大部分场景的问题）
      if (chunk[chunk.length - 1] !== '}') {
        this.currentChunk = chunk
      }
      return chunk
    },
    stop() {
      this.controller.abort()
      this.controller = new AbortController()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.customScrollbar {
  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    background: transparent;
    display: none;
  }
}
</style>
