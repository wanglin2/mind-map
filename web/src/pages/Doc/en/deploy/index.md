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

If you want to modify the path of the 'index. html' file referencing static resources, you can modify the 'publicPath' configuration of the 'web/vue.config.js' file.

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

In writing...