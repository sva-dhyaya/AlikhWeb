#!/bin/bash
set -e

# --------------------------------------- Configuration -----------------------------------------
# Nginx Path configuration
NGX_PREFIX_PATH=/etc/nginx
NGX_SBIN_PATH=/usr/sbin/nginx
NGX_MODULES_PATH=/usr/lib/nginx/modules
NGX_CONF_PATH=/etc/nginx
NGX_LOG_PATH=/opt/nginxlogs
NGX_TMP_CACHE_PATH=/var/cache/nginx
NGX_PID_PATH=/var/run/nginx.pid
NGX_LOCK_PATH=/var/run/nginx.lock

# Build Path Configuration
INSTALL_TEMP_PATH=./sources_temp_dir
NGINX_SOURCE_DIRNAME=nginx-1.18.0
NGINX_UPLOAD_MODULE_SOURCE_DIRNAME=nginx-upload-module-master

# --------------------------------------- Environment Setup -------------------------------------
if [ "$(command -v nginx)" ]; then
  echo "Nginx already installed."
  exit 0
fi

SCRIPT_BASE_DIR=$(pwd)
SRC_CONFIG_PATH="$SCRIPT_BASE_DIR/nginx_conf"

# exporting required environment variables
export TZ="Asia/Kolkata"
export DEBIAN_FRONTEND=noninteractive

# packages that should be downloaded along with their ./configure options
COMPILE_OPTIONS="--prefix=$NGX_PREFIX_PATH \
    --sbin-path=$NGX_SBIN_PATH \
    --modules-path=$NGX_MODULES_PATH \
    --conf-path=$NGX_CONF_PATH/nginx.conf \
    --error-log-path=$NGX_LOG_PATH/error.log \
    --http-log-path=$NGX_LOG_PATH/access.log \
    --http-client-body-temp-path=$NGX_TMP_CACHE_PATH/client_temp \
    --http-proxy-temp-path=$NGX_TMP_CACHE_PATH/proxy_temp \
    --http-fastcgi-temp-path=$NGX_TMP_CACHE_PATH/fastcgi_temp \
    --http-uwsgi-temp-path=$NGX_TMP_CACHE_PATH/uwsgi_temp \
    --http-scgi-temp-path=$NGX_TMP_CACHE_PATH/scgi_temp \
    --pid-path=$NGX_PID_PATH \
    --lock-path=$NGX_LOCK_PATH \
    --user=$USER \
    --with-select_module \
    --with-poll_module \
    --with-file-aio \
    --with-threads \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_xslt_module=dynamic \
    --with-http_image_filter_module=dynamic \
    --with-http_geoip_module=dynamic \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_auth_request_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_degradation_module \
    --with-http_slice_module \
    --with-http_stub_status_module \
    --with-mail=dynamic \
    --with-mail_ssl_module \
    --with-stream \
    --with-stream_ssl_module \
    --with-stream_realip_module \
    --with-stream_geoip_module=dynamic \
    --with-stream_ssl_preread_module \
    --with-compat \
    --with-pcre \
    --with-pcre-jit \
    --with-debug \
    --add-module=../$NGINX_UPLOAD_MODULE_SOURCE_DIRNAME"

# -------------------------------------------- Start --------------------------------------------
# cd to temp path
cd $INSTALL_TEMP_PATH


# Installing required packages
COMPILE_TIME_PACKAGES="libc-dev gcc make libssl-dev libpcre3-dev zlib1g-dev libgd-dev libgeoip-dev libxml2-dev libxslt1-dev"
RUNTIME_PACKAGES="libc6 libssl1.1 libpcre3 zlib1g libgd3 libgeoip1 geoip-bin libxml2 libxslt1.1"

apt-get update

echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Installing Compile-Time packages..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
apt-get install --no-install-recommends -y $COMPILE_TIME_PACKAGES

echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Installing RunTime packages..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
apt-get install --no-install-recommends -y $RUNTIME_PACKAGES


# Installing Nginx
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Installing Nginx..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
cd ./$NGINX_SOURCE_DIRNAME
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Configuring Nginx Build..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
./configure $COMPILE_OPTIONS

echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Compiling Nginx..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
make

echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Installing Nginx..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
make install
cd $SCRIPT_BASE_DIR


echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Configuring Nginx..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
# creating nginx runtime directories
# create nginx log path
mkdir -p "$NGX_LOG_PATH"

# creating nginx temp directories
mkdir -p "$NGX_TMP_CACHE_PATH"/{client_temp,proxy_temp,fastcgi_temp,uwsgi_temp,scgi_temp}

# create Nginx config directories
mkdir -p "$NGX_CONF_PATH"/{conf.d,snippets,sites-available,sites-enabled}

# creating nginx dynamic modules soft link in config path
ln -s "$NGX_MODULES_PATH" "$NGX_CONF_PATH/modules"

# copying default configuration files
cp "$SRC_CONFIG_PATH/nginx.conf" "$NGX_CONF_PATH/nginx.conf"
cp "$SRC_CONFIG_PATH/upload.routes" "$NGX_CONF_PATH/upload.routes"
cp "$SRC_CONFIG_PATH/upload.default.conf" "$NGX_CONF_PATH/upload.default.conf"

# configuring ngix
cp "$SRC_CONFIG_PATH/alikh.conf" "$NGX_CONF_PATH/sites-available/alikh.conf"
ln -s "$NGX_CONF_PATH/sites-available/alikh.conf" "$NGX_CONF_PATH/sites-enabled/alikh.conf"

# all alikh configuration files will be placed here as *.params and *.routes files
mkdir -p "$NGX_CONF_PATH/alikh.conf.d"
cp "$SRC_CONFIG_PATH/upload_pass_callback.routes" "$NGX_CONF_PATH/alikh.conf.d/upload_pass_callback.routes"

echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Nginx installed successfully."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"


echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Removing Compile-Time packages..."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
apt-get remove -y $COMPILE_TIME_PACKAGES
apt-get autoremove -y
apt-get autoclean
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Cleanup successful."
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
exit 0
