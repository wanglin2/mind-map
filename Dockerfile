FROM nginx
RUN mkdir /app
COPY ./dist ./index.html /app/
COPY nginx.conf /etc/nginx/nginx.conf