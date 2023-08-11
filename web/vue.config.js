const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const isLibrary = process.env.NODE_ENV === 'library'

const WebpackDynamicPublicPathPlugin = require('webpack-dynamic-public-path')

module.exports = {
  publicPath: isDev ? '' : './dist',
  outputDir: '../dist',
  lintOnSave: false,
  productionSourceMap: false,
  filenameHashing: false,
  chainWebpack: config => {
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 支持运行时设置public path
    if (!isDev) {
      config
        .plugin('dynamicPublicPathPlugin')
        .use(WebpackDynamicPublicPathPlugin, [
          { externalPublicPath: 'window.externalPublicPath' }
        ])
    }
    // 给插入html页面内的js和css添加hash参数
    if (!isLibrary) {
      config.plugin('html').tap(args => {
        args[0].hash = true
        return args
      })
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/electron/preload.js',
      builderOptions: {
        productName: '思绪思维导图',
        copyright: 'Copyright © 思绪思维导图',
        // compression: "maximum", // 机器好的可以打开，配置压缩，开启后会让 .AppImage 格式的客户端启动缓慢
        asar: true,
        fileAssociations: [
          {
            ext: 'smm',
            name: 'mind map file',
            role: 'Editor',
            icon: './build/icons/icon.ico'
          }
        ],
        publish: [
          {
            provider: 'github',
            owner: 'wanglin2',
            repo: 'mind-map',
            vPrefixedTagName: true,
            releaseType: 'draft'
          }
        ],
        directories: {
          output: 'dist_electron'
        },
        mac: {
          target: [
            {
              target: 'dmg',
              arch: ['x64', 'arm64', 'universal']
            }
          ],
          artifactName: '${productName}-${os}-${version}-${arch}.${ext}',
          category: 'public.app-category.utilities',
          darkModeSupport: false
        },
        win: {
          target: [
            {
              target: 'portable',
              arch: ['x64']
            },
            {
              target: 'nsis',
              arch: ['x64']
            }
          ],
          publisherName: '思绪思维导图',
          icon: 'build/icons/icon.ico',
          publish: ['github']
        },
        linux: {
          target: [
            {
              target: 'AppImage',
              arch: ['x64']
            },
            {
              target: 'tar.gz',
              arch: ['x64', 'arm64']
            },
            {
              target: 'deb',
              arch: ['x64', 'armv7l', 'arm64']
            },
            {
              target: 'rpm',
              arch: ['x64']
            },
            {
              target: 'snap',
              arch: ['x64']
            },
            {
              target: 'pacman',
              arch: ['x64']
            }
          ],
          category: 'Utilities',
          icon: './build/icon.icns'
        },
        dmg: {
          icon: 'build/icons/icon.icns'
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          perMachine: true,
          deleteAppDataOnUninstall: true
        }
      },
      // 渲染线程的配置文件
      chainWebpackRendererProcess: config => {
        config.plugin('define').tap(args => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      }
    }
  }
}
