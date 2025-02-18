const express = require('express')
const http = require('http')
const { pipeline } = require('stream')

const port = 3456

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
app.post('/ai/chat', (req, res) => {
  // 设置SSE响应头
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const { api, method, headers, data } = req.body

  // 创建代理请求
  const proxyReq = http.request(
    api,
    {
      method: method || 'POST',
      headers: {
        ...headers
      }
    },
    proxyRes => {
      // 检查目标服务响应状态
      if (proxyRes.statusCode !== 200) {
        proxyRes.resume()
        return res.status(proxyRes.statusCode).end()
      }

      // 使用双向流管道
      const pipelinePromise = new Promise(resolve => {
        pipeline(proxyRes, res, err => {
          // 过滤客户端主动断开的情况
          if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            console.error('Pipeline error:', err)
          }
          resolve()
        })
      })

      // 处理流结束
      proxyRes.on('end', () => {
        if (!res.writableEnded) {
          res.end()
        }
      })

      return pipelinePromise
    }
  )

  // 错误处理增强
  const handleError = err => {
    if (!res.headersSent) {
      res.status(502).end('Bad Gateway')
    }
    cleanupStreams()
  }

  // 流清理函数
  const cleanupStreams = () => {
    proxyReq.destroy()
    res.destroy()
  }

  // 事件监听器
  proxyReq.on('error', handleError)
  res.on('error', handleError)

  // 处理客户端提前断开
  req.on('close', () => {
    if (!res.writableFinished) {
      console.log('Client disconnected prematurely')
      cleanupStreams()
    }
  })

  proxyReq.write(JSON.stringify(data))
  proxyReq.end()
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
