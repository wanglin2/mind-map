.PHONY: build run

# 变量定义
PROJECT_NAME := mind-map
IMAGE_NAME := $(PROJECT_NAME):latest
CONTAINER_NAME := $(PROJECT_NAME)-container
WEB_DIR := ../web
BUILD_SCRIPT := ./build.sh
RUN_SCRIPT := ./run.sh
PORT ?= 1024

# 从源码构建成可执行的镜像
# 包括：清理旧产物 -> 安装依赖 -> 编译项目 -> 构建 Docker 镜像
build:
	@echo "=========================================="
	@echo "开始构建镜像..."
	@echo "=========================================="
	@echo "步骤 0/4: 清理旧构建产物..."
	@rm -rf ../dist ../index.html
	@echo "步骤 1/4: 安装依赖..."
	@echo "  1.1: 链接本地模块 simple-mind-map..."
	@cd ../simple-mind-map && yarn link 2>/dev/null || true
	@cd $(WEB_DIR) && yarn link simple-mind-map 2>/dev/null || true
	@echo "  1.2: 安装其他依赖..."
	@cd $(WEB_DIR) && yarn install --ignore-engines
	@echo "步骤 2/4: 编译项目..."
	@NODE_OPTIONS=--openssl-legacy-provider bash $(BUILD_SCRIPT)
	@echo "步骤 3/4: 构建 Docker 镜像..."
	@docker build -t $(IMAGE_NAME) -f ./Dockerfile ..
	@echo "=========================================="
	@echo "构建完成！镜像名称: $(IMAGE_NAME)"
	@echo "=========================================="

# 启动刚才构建的镜像（会先执行 build）
# 使用方式: make run 或 make run PORT=8080
run: build
	@echo "=========================================="
	@echo "启动容器..."
	@echo "=========================================="
	@PORT=$(PORT) bash $(RUN_SCRIPT)
	@echo "=========================================="
	@echo "应用已启动！访问 http://localhost:$(PORT)"
	@echo "=========================================="
