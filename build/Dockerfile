# 使用官方 nginx 镜像作为基础镜像
FROM nginx:alpine

# 创建应用目录
RUN mkdir -p /app

# 复制构建产物（dist 内容直接放到 /app 根目录，URL 无 dist 前缀）
# index.html 由 copy.js 已复制到项目根，其余静态资源从 dist 拷贝
COPY ./index.html /app/
COPY ./dist/. /app/
COPY ./nginx.conf /etc/nginx/nginx.conf

# 设置工作目录
WORKDIR /app

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
