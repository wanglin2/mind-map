const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 启用跨域
app.use(cors());
app.use(express.json());

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置文件存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 生成唯一文件名，避免重复
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// 文件上传接口
app.post('/api/file/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: '没有上传文件' });
  }

  // 返回完整的文件URL
  const fileUrl = `/api/file/${req.file.filename}`;
  
  return res.json({
    success: true,
    data: {
      url: fileUrl,
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    }
  });
});

// 文件获取接口
app.get('/api/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: '文件不存在' });
  }

  // 获取文件扩展名并设置正确的 Content-Type
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.xml': 'application/xml',
    '.csv': 'text/csv',
    '.log': 'text/plain',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
    // 可以根据需要添加更多类型
  };

  // 设置Content-Type
  if (mimeTypes[ext]) {
    res.setHeader('Content-Type', mimeTypes[ext]);
  }

  // 发送文件
  res.sendFile(filePath);
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 