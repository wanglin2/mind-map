const express = require('express')
const axios = require('axios')
const net = require('net')

const port = 3456

const isPortUsed = port => {
  return new Promise(resolve => {
    const server = net.createServer()
    server.once('error', err => {
      if (err.code === 'EADDRINUSE') {
        resolve(true) // 端口被占用
      } else {
        resolve(false) // 其他错误
      }
    })
    server.once('listening', () => {
      server.close(() => resolve(false)) // 端口可用
    })
    server.listen(port) // 尝试监听端口
  })
}

const createServe = () => {
  // 起个服务
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // 允许跨域
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // 允许所有来源的跨域请求，或者指定一个域名
    res.header('Access-Control-Allow-Methods', '*') // 允许的方法
    res.header('Access-Control-Allow-Headers', '*') // 允许的头部信息
    next()
  })

  // 监听对话请求
  app.get('/ai/test', (req, res) => {
    res
      .json({
        code: 0,
        data: null,
        msg: '连接成功'
      })
      .end()
  })
  app.post('/ai/chat', async (req, res, next) => {
    // 设置SSE响应头
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const { api, method = 'POST', headers = {}, data } = req.body

    try {
      const response = await axios({
        url: api,
        method,
        headers,
        data,
        responseType: 'stream'
      })
      response.data.pipe(res)
    } catch (error) {
      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
}

isPortUsed(port).then(isUsed => {
  if (isUsed) {
    console.error('端口被占用')
  } else {
    createServe()
  }
})
