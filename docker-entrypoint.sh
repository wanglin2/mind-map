#!/bin/sh

# 启动AI服务
node /app/web/scripts/ai.js &
AI_PID=$!

# 启动nginx
nginx -g 'daemon off;' &
NGINX_PID=$!

# 等待任意一个进程退出
wait $AI_PID
EXIT_CODE=$?

# 清理：停止另一个进程
kill $NGINX_PID 2>/dev/null || true

exit $EXIT_CODE