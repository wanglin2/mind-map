# Deploy

The 'web' directory of this project provides a complete project developed based on the 'simple mind map' library, 'Vue2. x', and 'ElementUI'. The data is stored locally on the computer by default, and can also be manipulated locally on the computer. Originally intended as an online 'demo', it can also be directly used as an online version of the mind map application, online address: [https://wanglin2.github.io/mind-map/](https://wanglin2.github.io/mind-map/).

If your network environment is slow to access the 'GitHub' service, you can also deploy it to your server.

## Deploying to a static file server

The project itself does not rely on the backend, so it can be deployed to a static file server. The following commands can be executed in sequence:

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

Then you can choose to start the local service:

```bash
npm run serve
```

You can also directly package and generate construction products:

```bash
npm run build
```

The packaged entry page 'index.html' can be found in the project root directory, and the corresponding static resources are located in the 'dist' directory under the root directory. The 'html' file will access the resources in the 'dist' directory through relative paths, such as 'dist/xxx'. You can directly upload these two files or directories to your static file server. In fact, this project is deployed to 'GitHub Pages' in this way.

If you do not have any code modification requirements, it is also possible to directly copy these files from this repository.

If you want to package 'index.html' into the 'dist' directory as well, you can modify the 'scripts.build' command in the 'web/package.json' file to delete '&& node ../copy.js' from 'vue-cli-service build && node ../copy.js'.

If you want to modify the directory for packaging output, you can modify the 'outputDir' configuration of the 'web/vue.config.js' file to the path you want to output.

If you want to modify the path of the 'index. html' file referencing static resources, you can modify the 'publicPath' configuration of the 'web/vue.config.js' file. And the `window.externalPublicPath` config in `web/public/index.html` file.

In addition, the default route used is 'hash ', which means that there will be '#'in the path. If you want to use the 'history' route, you can modify the 'web/src/router.js' file to:

```js
const router = new VueRouter({
  routes
})
```

Change to:

```js
const router = new VueRouter({
  mode: 'history',
  routes
})
```

However, this requires backend support, as our application is a single page client application. If the backend is not properly configured, users will return 404 when accessing sub routes directly in the browser. Therefore, you need to add a candidate resource on the server that covers all situations: if the 'URL' cannot match any static resources, the same 'index. html' page should be returned.

## Docker

> Thank you very much [水车](https://github.com/shuiche-it), the corresponding Docker package is maintained by him.

Install directly from Docker Hub:

```
docker run -d -p 8081:8080 shuiche/mind-map:latest
```

Mindmap has activated port 8080 as the web service entry point in the container. When running the container through Docker, it is necessary to specify a local mapping port. In the above case, we mapped the local port 8081 to the container port 8080.

After the installation is completed, check the container's running status through 'Docker PS'.

Open 127.0.0.1:8081 in the browser to use the Web mind map function.

[在群晖上以 Docker 方式安装](https://laosu.gq/2023/09/02/%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%BA%93SimpleMindMap/)

## Docking with one's own storage services

The application data is stored locally in the browser by default, and the local storage capacity of the browser is relatively small, so it is easy to trigger restrictions when inserting more images in the mind map. Therefore, a better choice is to dock with your own storage service, which usually has two ways:

### The first

Simply clone the warehouse code and modify the relevant methods in 'web/src/API/index.js' to obtain data from your database and store it in your data.

### The second

Many times, you may want to always use the latest code from this repository, so the first method is not very convenient because you need to manually merge the code, so the second method is provided.

Specific operating steps:

1. Copy the packaged resources of the web application

This includes the 'dist' directory and the 'index.html' file.

2. Modify the copied 'index.html' file

Firstly, insert the following code into the 'head' tag:

```js
<script>
  window.takeOverApp = true
</script>
```

This line of code will prompt the application not to initialize the application 'i.e.: new Vue()', but to give control to you. Next, insert your own 'js' code at the end of the 'body', either inline or out of chain. The inline example is as follows:

```js
<script>
  // Your own method of requesting data
  const getDataFromBackend = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          // MindMap data
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
          // Page language, supporting Chinese (zh) and English (en)
          lang: 'zh',
          // Page Section Configuration
          localConfig: null
        })
      }, 200)
    })
  }
  // Register Global Method
  const setTakeOverAppMethods = (data) => {
    window.takeOverAppMethods = {}
    // Function for obtaining mind map data
    window.takeOverAppMethods.getMindMapData = () => {
      return data.mindMapData
    } 
    // Functions for Saving Mind Map Data
    window.takeOverAppMethods.saveMindMapData = (data) => {
      console.log(data)
      // The trigger frequency of this function may be high, so you should do throttling or anti shaking measures
    }
    // Function to obtain language
    window.takeOverAppMethods.getLanguage = () => {
      return data.lang
    }
    // Functions for Saving Languages
    window.takeOverAppMethods.saveLanguage = (lang) => {
      console.log(lang)
    }
    // Get locally configured functions
    window.takeOverAppMethods.getLocalConfig = () => {
      return data.localConfig
    }
    // Save locally configured functions
    window.takeOverAppMethods.saveLocalConfig = (config) => {
      console.log(config)
    }
  }
  window.onload = async () => {
    if (!window.takeOverApp) return
    // request data
    const data = await getDataFromBackend()
    // Method for setting global
    setTakeOverAppMethods(data)
    // Mind Map Instance Creation Completion Event
    window.$bus.$on('app_inited', (mindMap) => {
      console.log(mindMap)
    })
    // You can use window$ Bus$ On() to listen for some events in the application
    // Instantiate Page
    window.initApp()
  }
</script>
```

As shown above, when you set the 'window.takeOverApp=true' flag, the application will no longer actively instantiate, but will expose the instantiated methods for you to call. You can first request the data of the mind map from the backend, and then register the relevant methods. The application will call internally at the appropriate time to achieve the purpose of echo and save.

The advantage of doing this is that whenever the code in this repository is updated, you can simply copy the packaged files to your own server. With a slight modification of the 'index. html' page, you can achieve synchronous updates and use your own storage service.

## Modifying Static Resource Paths

If you want to maintain synchronous updates with the code in this repository as in the previous section, but also want to modify the storage location of static resources, for example, the default hierarchical relationship is:

```
-dist
--css
--fonts
--img
--js
-logo.ico

-index.html
```

And you want to adjust it to this:

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

So you can configure the 'window.externalPublicPath' in 'index.html' as the default `./dist/` is modified to:

```js
window.externalPublicPath = './assets/dist/'
```

At the same time, the paths of the inline '.ico', '.js', and '.css' resources in 'index.html' need to be manually modified by you.

It should be noted that it is best not to adjust the directory hierarchy within the 'dist' directory, otherwise exceptions may occur.

If you want to replace some of the static resources, such as the theme image and structure image, with your own designed image, you can directly overwrite it with the same name.