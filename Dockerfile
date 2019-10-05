FROM node:10.16.3-alpine AS build
WORKDIR  /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4-alpine AS deploy
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY ./.htaccess /usr/local/apache2/htdocs/
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf