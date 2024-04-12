FROM nginx
RUN mkdir /app
COPY ./index.html /app/
COPY ./dist /app/dist/
COPY nginx.conf /etc/nginx/nginx.conf