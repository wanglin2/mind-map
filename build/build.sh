#!/bin/bash

# 构建脚本
# 用于编译前端项目

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_DIR="$PROJECT_ROOT/web"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}开始构建项目${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查是否在正确的目录
if [ ! -d "$WEB_DIR" ]; then
    echo -e "${RED}错误: 找不到 web 目录: $WEB_DIR${NC}"
    exit 1
fi

# 检查 yarn 是否安装
if ! command -v yarn &> /dev/null; then
    echo -e "${RED}错误: 未找到 yarn，请先安装 yarn${NC}"
    echo -e "${YELLOW}安装方法: npm install -g yarn${NC}"
    exit 1
fi

# 链接本地模块 simple-mind-map
SIMPLE_MIND_MAP_DIR="$PROJECT_ROOT/simple-mind-map"
if [ -d "$SIMPLE_MIND_MAP_DIR" ]; then
    echo -e "${GREEN}链接本地模块 simple-mind-map...${NC}"
    cd "$SIMPLE_MIND_MAP_DIR"
    yarn link 2>/dev/null || true
    cd "$WEB_DIR"
    yarn link simple-mind-map 2>/dev/null || true
else
    echo -e "${YELLOW}警告: 未找到 simple-mind-map 目录${NC}"
fi

# 进入 web 目录
cd "$WEB_DIR"

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}未找到 node_modules，正在安装依赖...${NC}"
    yarn install --ignore-engines
fi

# 执行构建
echo -e "${GREEN}正在编译项目...${NC}"
export NODE_OPTIONS=--openssl-legacy-provider
yarn build

# 检查构建结果
if [ ! -f "$PROJECT_ROOT/index.html" ]; then
    echo -e "${RED}错误: 构建失败，未找到 index.html${NC}"
    exit 1
fi

if [ ! -d "$PROJECT_ROOT/dist" ]; then
    echo -e "${RED}错误: 构建失败，未找到 dist 目录${NC}"
    exit 1
fi

# 确认未包含 51.la SDK
if grep -q '51\.la\|LA_COLLECT\|LA\.init' "$PROJECT_ROOT/index.html" 2>/dev/null; then
    echo -e "${RED}警告: index.html 仍包含 51.la SDK，请确认 web/public/index.html 已移除相关 script${NC}"
else
    echo -e "${GREEN}已确认: index.html 不包含 51.la SDK${NC}"
fi

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}构建完成！${NC}"
echo -e "${GREEN}构建产物位置:${NC}"
echo -e "  - $PROJECT_ROOT/index.html"
echo -e "  - $PROJECT_ROOT/dist/"
echo -e "${GREEN}========================================${NC}"
