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

如果你想修改`index.html`文件引用静态资源的路径的话可以修改`web/vue.config.js`文件的`publicPath`配置。以及`web/public/index.html`文件的`window.externalPublicPath`配置。

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

> 非常感谢[水车](https://github.com/shuiche-it)维护的`Docker`镜像。

直接从 Docker hup 中安装：

```
docker run -d -p 8081:8080 shuiche/mind-map:latest
```

mind-map在容器中启动了8080端口作为web服务入口，通过docker运行容器时，需要指定本地映射端口，上面案例中，我们通过本地的8081端口映射到容器端口8080。

安装完成后，通过 `docker ps` 查看容器运行状态。

浏览器打开 127.0.0.1:8081 即可使用Web 思维导图功能。

[在群晖上以 Docker 方式安装](https://laosu.gq/2023/09/02/%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%BA%93SimpleMindMap/)

## 对接自己的存储服务

应用数据默认存储在浏览器本地，浏览器本地存储容量是比较小的，所以当在思维导图中插入更多图片后很容易触发限制，所以更好的选择是对接你自己的存储服务，这通常有两种方式：

### 第一种

直接clone本仓库代码，然后修改`web/src/api/index.js`内的相关方法即可实现从你的数据库里获取数据，以及存储到你的数据中。

### 第二种

很多时候，你可能想始终使用本仓库的最新代码，那么第一种方式就不太方便，因为你要手动去合并代码，所以提供了第二种方式。

具体操作步骤：

1.复制web应用打包后的资源

包括：`dist`目录和`index.html`文件。

2.修改复制后的`index.html`文件

首先在`head`标签里插入如下代码：

```js
<script>
  window.takeOverApp = true
</script>
```

这行代码会提示应用不要初始化应用`即：new Vue()`，而是把控制权交给你，接下来再在`body`的最后插入你自己的`js`代码，内联或则外链都可以，内联示例如下：

```js
<script>
  // 你自己的请求数据的方法
  const getDataFromBackend = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          // 思维导图数据
          mindMapData: {
            root: {
              "data": {
                  "text": "根节点"
              },
              "children": []
            },
            theme: { "template":"avocado","config":{} },
            layout: "logicalStructure",
            config: {},
            view: {}
          },
          // 页面语言，支持中文（zh）、英文（en）
          lang: 'zh',
          // 页面部分配置
          localConfig: null
        })
      }, 200)
    })
  }
  // 注册全局方法
  const setTakeOverAppMethods = (data) => {
    window.takeOverAppMethods = {}
    // 获取思维导图数据的函数
    window.takeOverAppMethods.getMindMapData = () => {
      return data.mindMapData
    } 
    // 保存思维导图数据的函数
    window.takeOverAppMethods.saveMindMapData = (data) => {
      console.log(data)
      // 该函数触发频率可能会很高，所以你应该做一下节流或防抖
    }
    // 获取语言的函数
    window.takeOverAppMethods.getLanguage = () => {
      return data.lang
    }
    // 保存语言的函数
    window.takeOverAppMethods.saveLanguage = (lang) => {
      console.log(lang)
    }
    // 获取本地配置的函数
    window.takeOverAppMethods.getLocalConfig = () => {
      return data.localConfig
    }
    // 保存本地配置的函数
    window.takeOverAppMethods.saveLocalConfig = (config) => {
      console.log(config)
    }
  }
  window.onload = async () => {
    if (!window.takeOverApp) return
    // 请求数据
    const data = await getDataFromBackend()
    // 设置全局的方法
    setTakeOverAppMethods(data)
    // 思维导图实例创建完成事件
    window.$bus.$on('app_inited', (mindMap) => {
      console.log(mindMap)
    })
    // 可以通过window.$bus.$on()来监听应用的一些事件
    // 实例化页面
    window.initApp()
  }
</script>
```

如上所示，当你设置了`window.takeOverApp = true`标志，应用不再主动进行实例化，而是会将实例化的方法暴露出来由你调用，那么你可以先从后端请求思维导图的数据，然后再注册相关的方法，应用内部会在合适的时机进行调用，从而达到回显和保存的目的。

这样做的好处是，每当本仓库代码更新了，你可以简单的复制打包后的文件到你自己的服务器，只要稍微修改一下`index.html`页面即可达到同步更新且使用自己的存储服务的目的。

## 修改静态资源路径

如果你想和上一节一样保持和本仓库代码的同步更新，但是又想修改静态资源的存放位置，比如默认的层级关系为：

```
-dist
--css
--fonts
--img
--js
-logo.ico

-index.html
```

而你想调整成这样：

```
-assets
--dist
---css
---fonts
---img
---js
-logo.ico

-index.html
```

那么你可以将`index.html`中的`window.externalPublicPath`配置由默认的`./dist/`修改为：

```js
window.externalPublicPath = './assets/dist/'
```

同时`index.html`中内联的`.ico`、`.js`、`.css`资源的路径需要你手动修改。

需要注意的是，`dist`目录内的目录层级关系最好不要调整，否则可能会出现异常。

如果你想替换其中的一些静态资源，比如你想将主题图片和结构的图片替换成你自己设计的图片，那么可以直接同名覆盖。