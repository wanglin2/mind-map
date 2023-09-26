# Client

This project also provides a client version using [Electron](https://www.electronjs.org/) Development. Supports 'Windows', 'Mac', and 'Linux'.

Currently, the function is relatively simple:

1. Support creating and opening files for editing;

2. Support viewing the list of recently edited files;

3. Support the copying, deletion, and renaming of files;

## Download

> The client version may lag behind the online version. To try new features, please prioritize using the online version.

You can directly download the corresponding client for installation and use, and two download addresses are provided:

Github：[releases](https://github.com/wanglin2/mind-map/releases)。

Baidu cloud disk：[地址](https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3)。

## Development

If necessary, you can also conduct secondary development.

### clone

```bash
git clone https://github.com/wanglin2/mind-map.git
cd mind-map
git checkout electron
```

### Start serve

Execute in the project root directory:

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

### Packaging client

You need at least two computers, one 'Windows' and one 'Mac'.

Packaging 'Windows' application:

```bash
npm run electron:build-win
```

Packaging 'Mac' application:

```bash
npm run electron:build-mac
```

Packaging 'Linux' application:

```bash
npm run electron:build-linux
```

Packaging all applications:

```bash
npm run electron:build-all
```

Automatically pack according to your computer system:

```bash
npm run electron:build
```