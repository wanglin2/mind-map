# 部署

本项目的`web`目录下提供了一个基于`simple-mind-map`库、`Vue2.x`、`ElementUI`开发的完整项目，数据默认存储在电脑本地，此外可以操作电脑本地文件，原意是作为一个线上`demo`，但是也完全可以直接把它当做一个在线版思维导图应用使用，在线地址：[https://wanglin2.github.io/mind-map/](https://wanglin2.github.io/mind-map/)。

如果你的网络环境访问`GitHub`服务很慢，你也可以部署到你的服务器上。

## 部署到静态文件服务器

项目本身不依赖后端，所以完全可以部署到一个静态文件服务器上，可以依次执行如下命令：

```bash
git clone https://github.com/wanglin2/mind-map.git
cd mind-map
cd simple-mind-map
npm i
npm link
cd ..
cd web
npm i
npm link simple-mind-map
```

然后你可以选择启动本地服务：

```bash
npm run serve
```

也可以直接打包生成构建产物：

```bash
npm run build
```

打包完后的入口页面`index.html`可以在项目根目录找到，对应的静态资源在根目录下的`dist`目录，`html`文件中会通过相对路径访问`dist`目录的资源，比如`dist/xxx`。你可以直接把这两个文件或目录上传到你的静态文件服务器，事实上，本项目就是这样部署到`GitHub Pages`上的。

如果你没有代码修改需求的话，直接从本仓库复制这些文件也是可以的。

如果你想把`index.html`也打包进`dist`目录，可以修改`web/package.json`文件的`scripts.build`命令，把`vue-cli-service build && node ../copy.js`中的` && node ../copy.js`删除即可。

如果你想修改打包输出的目录，可以修改`web/vue.config.js`文件的`outputDir`配置，改成你想要输出的路径即可。

如果你想修改`index.html`文件引用静态资源的路径的话可以修改`web/vue.config.js`文件的`publicPath`配置。

另外默认使用的是`hash`路由，也就是路径中会在`#`，如果你想使用`history`路由，可以修改`web/src/router.js`文件，将：

```js
const router = new VueRouter({
  routes
})
```

改成：

```js
const router = new VueRouter({
  mode: 'history',
  routes
})
```

不过这需要后台支持，因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问子路由时会返回404，所以呢你要在服务端增加一个覆盖所有情况的候选资源：如果`URL`匹配不到任何静态资源，则应该返回同一个`index.html`页面。

## Docker

编写中。。。