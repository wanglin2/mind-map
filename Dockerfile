FROM node:16-alpine

# 安装Node.js依赖和构建工具
WORKDIR /app

# 先复制package.json和package-lock.json
COPY ./web/package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY ./index.html /app/
COPY ./dist /app/dist/
COPY ./web /app/web/

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 安装nginx
RUN apk add --no-cache nginx

# 创建nginx和app目录
RUN mkdir -p /var/www/html /var/log/nginx /var/lib/nginx/tmp /run/nginx

# 复制启动脚本
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 3456

CMD ["/docker-entrypoint.sh"]