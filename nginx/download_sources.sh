#!/bin/bash
set -e

CUR_DIR=$(pwd)

apt-get update && apt-get install -y unzip wget

# creating cache directory
mkdir -p ./sources_temp_dir
cd ./sources_temp_dir

# nginx-upload-module
if [ -f ./nginx-upload-module.zip ]; then
  echo "'nginx-upload-module.zip' already downloaded."
else
  if wget "https://github.com/fdintino/nginx-upload-module/archive/master.zip" -O "nginx-upload-module.zip"; then
    echo "'nginx-upload-module.zip' downloaded successfully."
    if unzip ./nginx-upload-module.zip; then
      echo "'nginx-upload-module.zip' extracted successfully."
    else
      echo "failed to extract 'nginx-upload-module.zip' file." && exit 1
    fi
  else
    echo "Error: failed to download 'nginx-upload-module.zip'" && exit 1
  fi
fi

# nginx
if [ -f ./nginx-1.18.0.tar.gz ]; then
  echo "'nginx-1.18.0.tar.gz' already downloaded."
else
  if wget "https://nginx.org/download/nginx-1.18.0.tar.gz"; then
    echo "'nginx-1.18.0.tar.gz' downloaded successfully."
    if tar -xvzf nginx-1.18.0.tar.gz; then
      echo "'nginx-1.18.0.tar.gz' extracted successfully."
    else
      echo "failed to extract 'nginx-1.18.0.tar.gz' file." && exit 1
    fi
  else
    echo "Error: failed to download 'nginx-1.18.0.tar.gz'" && exit 1
  fi
fi

cd "$CUR_DIR"