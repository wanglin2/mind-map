#!/bin/bash

# 运行脚本
# 用于启动 Docker 容器

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置
IMAGE_NAME="mind-map:latest"
CONTAINER_NAME="mind-map-container"
# 端口可以从环境变量获取，默认为 80
PORT=${PORT:-80}

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}启动 Docker 容器${NC}"
echo -e "${GREEN}端口: ${PORT}${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}错误: 未找到 docker，请先安装 docker${NC}"
    exit 1
fi

# 检查镜像是否存在
if ! docker images | grep -q "mind-map.*latest"; then
    echo -e "${YELLOW}镜像不存在，请先运行: make build${NC}"
    exit 1
fi

# 停止并删除已存在的容器
if docker ps -a | grep -q "$CONTAINER_NAME"; then
    echo -e "${YELLOW}发现已存在的容器，正在停止并删除...${NC}"
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
fi

# 运行容器
echo -e "${GREEN}正在启动容器...${NC}"
docker run -d \
    --name "$CONTAINER_NAME" \
    -p "$PORT:80" \
    "$IMAGE_NAME"

# 检查容器是否启动成功
sleep 2
if docker ps | grep -q "$CONTAINER_NAME"; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}容器启动成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "容器名称: ${GREEN}$CONTAINER_NAME${NC}"
    echo -e "镜像名称: ${GREEN}$IMAGE_NAME${NC}"
    echo -e "访问地址: ${GREEN}http://localhost:$PORT${NC}"
    echo -e ""
    echo -e "查看日志: ${YELLOW}docker logs -f $CONTAINER_NAME${NC}"
    echo -e "停止容器: ${YELLOW}docker stop $CONTAINER_NAME${NC}"
    echo -e "删除容器: ${YELLOW}docker rm $CONTAINER_NAME${NC}"
    echo -e "${GREEN}========================================${NC}"
else
    echo -e "${RED}容器启动失败，请检查日志: docker logs $CONTAINER_NAME${NC}"
    exit 1
fi
