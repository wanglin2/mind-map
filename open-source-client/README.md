# 开源思维导图客户端

一个基于 [simple-mind-map](https://github.com/wanglin2/mind-map) + Electron 构建的开源跨平台桌面思维导图应用。

## ✨ 特性

- 🆓 **完全开源** - MIT 许可证，代码完全开放
- 💻 **跨平台** - 支持 Windows、macOS、Linux
- 📁 **本地存储** - 所有数据保存在本地，保护隐私
- 🎨 **丰富功能** - 基于强大的 simple-mind-map 库
  - 多种结构类型（思维导图、逻辑图、组织结构图等）
  - 丰富的主题支持
  - 节点内容支持（文本、图片、链接、图标等）
  - 导入导出多种格式
- 🔧 **可扩展** - 易于二次开发和定制

## 🚀 快速开始

### 环境要求

- Node.js >= 16.x
- npm >= 8.x

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm start
```

### 构建安装包

#### Windows
```bash
npm run build:win
```

#### macOS
```bash
npm run build:mac
```

#### Linux
```bash
npm run build:linux
```

构建后的安装包位于 `dist/` 目录。

## 📖 使用说明

### 快捷键

- `Ctrl/Cmd + N` - 新建文件
- `Ctrl/Cmd + O` - 打开文件
- `Ctrl/Cmd + S` - 保存文件
- `Ctrl/Cmd + Shift + S` - 另存为
- `Ctrl/Cmd + Q` - 退出应用

### 编辑操作

- 双击节点编辑文本
- Tab - 添加子节点
- Enter - 添加兄弟节点
- Delete/Backspace - 删除节点
- Ctrl/Cmd + Z - 撤销
- Ctrl/Cmd + Y - 重做

## 🛠️ 技术栈

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [simple-mind-map](https://github.com/wanglin2/mind-map) - 强大的 JavaScript 思维导图库
- [Vue 2](https://vuejs.org/) - 渐进式 JavaScript 框架（可选）
- [Element UI](https://element.eleme.io/) - Vue UI 组件库（可选）

## 📂 项目结构

```
open-source-client/
├── main.js          # Electron 主进程
├── index.html       # 渲染进程 HTML
├── renderer.js      # 渲染进程 JavaScript
├── package.json     # 项目配置
└── README.md        # 说明文档
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [simple-mind-map 官方文档](https://wanglin2.github.io/mind-map-docs/)
- [原项目仓库](https://github.com/wanglin2/mind-map)
- [在线演示](https://web.sxmind.cn/)

## ⚠️ 说明

本项目是一个基础的开源思维导图客户端示例，基于 simple-mind-map 库构建。相比商业版本，功能可能不够完善，但核心功能完整且完全开源免费。

如需更多高级功能（如 AI 生成、云同步、多端协作等），请访问官方网站：https://sxmind.cn/
