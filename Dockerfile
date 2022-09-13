# syntax=docker/dockerfile:1

FROM ubuntu:focal

WORKDIR /code

# creating required directories
RUN mkdir /code/nginx_conf /code/sources_temp_dir /code/dist

# downloading nginx sources
COPY ./nginx/download_sources.sh /code/download_sources.sh
RUN bash /code/download_sources.sh

# copying service source
COPY ./nginx/nginx_conf nginx_conf
COPY ./nginx/install_nginx.sh /code/install_nginx.sh

# install nginx
RUN bash /code/install_nginx.sh

# deleting temp directory
RUN rm -rf /code/sources_temp_dir /code/nginx_conf /code/install_nginx.sh
RUN rm /code/download_sources.sh

RUN rm /etc/nginx/alikh.conf.d/upload_pass_callback.routes

COPY ./nginx/nginx_conf/alikh-selfsigned.crt /etc/nginx/alikh-selfsigned.crt
COPY ./nginx/nginx_conf/alikh-selfsigned.key /etc/nginx/alikh-selfsigned.key
COPY ./nginx/nginx_conf/alikh.conf.d /etc/nginx/alikh.conf.d


COPY dist /code/dist

STOPSIGNAL SIGTERM








CMD ["nginx", "-g", "daemon off;"]