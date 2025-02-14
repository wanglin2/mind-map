const express = require('express')
const http = require('http')

const port = 3000
const baseUrl = 'http://ark.cn-beijing.volces.com'

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
  res.send('/ai/test').end()
})
app.post('/ai/chat', (req, res) => {
  try {
    const { a: apiKey, b: model, messages } = req.body

    //   res.append('Content-Type', 'text/event-stream')
    //   res.append('Cache-Control', 'no-cache')
    //   res.append('Connection', 'keep-alive')
    res.send(1).end(200)
  } catch (error) {
    console.log(error)
  }

  // 模拟发送数据
  //   const intervalId = setInterval(() => {
  //     res.send(`data: ${new Date().toISOString()}\n\n`)
  //   }, 1000)

  //   // 监听客户端断开连接
  //   req.on('close', () => {
  //     console.log('Client disconnected.')
  //     clearInterval(intervalId)
  //     res.end()
  //   })

  //   const aiReq = http.request(
  //     baseUrl + '/api/v3/chat/completions',
  //     {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + apiKey
  //       }
  //     },
  //     aiRes => {
  //       aiRes.on('data', chunk => {
  //         console.log(`BODY: ${chunk}`)
  //         res.send(chunk)
  //       })
  //       aiRes.on('end', () => {
  //         console.log('No more data in response.')
  //         res.end()
  //       })
  //     }
  //   )
  //   const postData = {
  //     model,
  //     messages,
  //     stream: true
  //   }
  //   aiReq.write(JSON.stringify(postData))
  //   aiReq.end()
})

// res.writeHead(404)
// res.end()

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
