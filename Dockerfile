FROM nginx:1.13.8

WORKDIR /app

COPY ./dist /app/dist

COPY ./nginx.conf /etc/nginx/conf.d/

EXPOSE 10080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
