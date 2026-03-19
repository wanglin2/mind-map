# 构建和部署系统

这个目录包含了使用 yarn 和 docker 进行编译、打包和部署的完整工具链。

## 文件说明

- `Makefile` - 主要的构建管理文件，提供各种 make 命令
- `build.sh` - 编译脚本，使用 yarn 编译前端项目
- `run.sh` - 运行脚本，启动 Docker 容器
- `Dockerfile` - Docker 镜像构建文件

## 快速开始

### 方式一：使用 Makefile（推荐）

```bash
# 查看所有可用命令
make help

# 完整流程：安装依赖 -> 编译 -> 构建镜像 -> 运行容器
make run

# 或者分步执行
make install      # 安装依赖
make build        # 编译项目
make docker-build # 构建 Docker 镜像
make docker-run   # 运行 Docker 容器
```

### 方式二：直接使用脚本

```bash
# 编译项目
./build.sh

# 构建 Docker 镜像（需要先编译）
cd ..
docker build -t mind-map:latest -f yzq_build/Dockerfile .

# 运行容器
./run.sh
```

## 详细命令说明

### Makefile 命令

| 命令 | 说明 |
|------|------|
| `make help` | 显示所有可用命令 |
| `make install` | 在 web 目录执行 `yarn install` |
| `make build` | 执行 `build.sh` 编译项目 |
| `make docker-build` | 构建 Docker 镜像 |
| `make docker-run` | 运行 Docker 容器（端口 80） |
| `make docker-stop` | 停止运行中的容器 |
| `make docker-rm` | 删除容器 |
| `make docker-rmi` | 删除镜像 |
| `make clean` | 清理构建产物（dist 和 index.html） |
| `make all` | 执行完整构建流程（install -> build -> docker-build） |
| `make run` | 执行完整流程并运行容器 |

### Shell 脚本

#### build.sh
- 检查 yarn 是否安装
- 检查并安装依赖（如果 node_modules 不存在）
- 执行 `yarn build` 编译项目
- 验证构建结果

#### run.sh
- 检查 Docker 是否安装
- 检查镜像是否存在
- 停止并删除已存在的容器
- 启动新的容器（端口映射 80:80）
- 显示访问地址和常用命令

## 使用示例

### 完整部署流程

```bash
# 1. 进入构建目录
cd yzq_build

# 2. 执行完整流程
make run

# 3. 访问应用
# 浏览器打开 http://localhost
```

### 分步执行

```bash
# 1. 安装依赖
make install

# 2. 编译项目
make build

# 3. 构建镜像
make docker-build

# 4. 运行容器
make docker-run
```

### 更新部署

```bash
# 1. 停止并删除旧容器
make docker-stop
make docker-rm

# 2. 重新编译和构建
make all

# 3. 运行新容器
make docker-run
```

### 清理环境

```bash
# 清理构建产物
make clean

# 删除容器和镜像
make docker-stop
make docker-rm
make docker-rmi
```

## Docker 容器管理

### 查看容器状态
```bash
docker ps -a | grep mind-map
```

### 查看容器日志
```bash
docker logs -f mind-map-container
```

### 进入容器
```bash
docker exec -it mind-map-container sh
```

### 停止容器
```bash
make docker-stop
# 或
docker stop mind-map-container
```

### 删除容器
```bash
make docker-rm
# 或
docker rm mind-map-container
```

## 端口配置

默认端口是 80，如果需要修改：

1. 修改 `run.sh` 中的 `PORT` 变量
2. 或者直接使用 docker 命令：
```bash
docker run -d --name mind-map-container -p 8080:80 mind-map:latest
```

## 故障排查

### 构建失败
- 检查 yarn 是否安装：`yarn --version`
- 检查 node_modules 是否存在
- 查看构建日志中的错误信息

### 容器启动失败
- 检查镜像是否存在：`docker images | grep mind-map`
- 查看容器日志：`docker logs mind-map-container`
- 检查端口是否被占用：`netstat -tuln | grep 80`

### 访问失败
- 检查容器是否运行：`docker ps | grep mind-map`
- 检查防火墙设置
- 确认端口映射正确

## 注意事项

1. 确保已安装 yarn 和 docker
2. 构建前确保有足够的磁盘空间
3. 如果修改了代码，需要重新执行 `make build` 和 `make docker-build`
4. 生产环境建议使用 HTTPS，需要配置 SSL 证书
