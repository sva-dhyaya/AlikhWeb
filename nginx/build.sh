#!/bin/bash

# download sources
bash ./download_sources.sh

# build docker image
sudo docker build --force-rm --tag alikh-web:latest ../

# delete sources
if [ -d ./sources_temp_dir ]; then
  rm -rf ./sources_temp_dir
fi
