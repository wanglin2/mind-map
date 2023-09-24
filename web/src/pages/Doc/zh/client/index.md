# 客户端

本项目也提供了客户端版本，使用[Electron](https://www.electronjs.org/)开发。支持`Windows`、`Mac`及`Linux`。

目前功能比较简单：

1.支持新建、打开文件进行编辑；

2.支持查看最近编辑文件列表；

3.支持文件的复制、删除、重命名；

## 下载

> 客户端版本会落后于在线版本，要尝试新功能请优先使用在线版。

你可以直接下载对应的客户端安装使用，提供了两个下载地址：

Github：[releases](https://github.com/wanglin2/mind-map/releases)。

百度云盘：[地址](https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3)。

## 开发

如果有需要，你也可以进行二次开发。

### clone

```bash
git clone https://github.com/wanglin2/mind-map.git
cd mind-map
git checkout electron
```

### 启动服务

在项目根目录下执行：

```bash
cd simple-mind-map
npm i
npm link
cd ..
cd web
npm i
npm link simple-mind-map
npm run electron:serve
```

### 打包客户端

你至少需要两台电脑，一台`Windows`和一台`Mac`。

打包`Windows`应用：

```bash
npm run electron:build-win
```

打包`Mac`应用：

```bash
npm run electron:build-mac
```

打包`Linux`应用：

```bash
npm run electron:build-linux
```

打包全部应用：

```bash
npm run electron:build-all
```

根据你的电脑系统自动打包：

```bash
npm run electron:build
```