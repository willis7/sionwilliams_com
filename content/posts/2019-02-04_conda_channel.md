---
title: "Building a Private Conda Channel"
date: 2019-02-04T10:02:44Z
draft: false
toc: true
images:
tags:
  - engineering
  - devops
  - data science
  - python
  - ci
  - jupyter
  - howto
---


> I first wrote this blog when I was working at City Science

## Why we need a private conda channel

Here at City Science we build a large number of reusable Python modules. For developers to consume these libraries, we needed to host the different versions at a central location. There are public hosting solutions available, but for now we needed our libraries to remain private. For that reason we opted to create our own channel.

## Pre-requistes

* A familiarity with [Docker](https://docs.docker.com/get-started/)
* A server with Docker and [Docker compose](https://docs.docker.com/compose/install/) installed
* `/var/docker-data/nginx/data/` directory on the host for storing the conda packages
* `/var/docker-data/nginx/conf.d/` directory on the host for storing the nginx configuration

## The Web Server

To make our files available over http, we used an [NGINX Web Server](https://www.nginx.com/) to serve our static files. To simplify the deployment process we used the official Docker image, and pointed it to our custom nginx.config which you can see below.

```
user nobody nogroup;
worker_processes 1;

events {
  worker_connections 512;
}

http {
  server {
    listen 80;
    root /usr/share/nginx/html;

    access_log /dev/stdout;
    error_log /dev/stderr;

    location /condapkg/ {
        autoindex on;
    }

  }
}
```

The configuration above serves up the files under `/usr/share/nginx/html/condapkg` via the url `http://<hostname>/condapkg`. The autoindex on directive tells NGINX to automatically generate a directory listing, and we are pushing the access and error logs to stdout and stderr respectively. The logging is handled this way so that Docker can use the logs, but I’m not going to get into the internals of Docker here.

The Docker Compose configuration can be found below.

```yaml
version: "2"

services:
  nginx:
    restart: always
    image: nginx
    ports:
      - "80:80"
    volumes:
      - /var/docker-data/nginx/data/:/usr/share/nginx/html:ro
      - /var/docker-data/nginx/conf.d/nginx.conf:/etc/nginx/nginx.conf:ro
```
This is an extremely simple docker-compose.yml file which tells the Docker daemon we always want to restart this container when the system restarts, we want the official nginx image, and we want to map the container port 80 to port 80 on the host. Finally, we tell Docker that we want to mount 2 of the host volumes to the container.

The last thing we need to do is ensure the directories are structured correctly on the host machine. Here’s a simple script I wrote to do that (assuming you used the same directory structure in the Pre-requistes).

```bash
#!/bin/sh

THISDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOCKER_DATA_DIR=/var/docker-data/nginx/data
CONDAPKG_DIR=$DOCKER_DATA_DIR/condapkg

echo "====> Creating conda directory structure ..."
mkdir -p $CONDAPKG_DIR/linux-64/
mkdir -p $CONDAPKG_DIR/linux-32/
mkdir -p $CONDAPKG_DIR/osx-64/
mkdir -p $CONDAPKG_DIR/win-64/
mkdir -p $CONDAPKG_DIR/win-32/
echo "<==== Finished creating conda directory structure ..."

echo "====> Copy NGINX config ..."
cp -rf ./conf.d /var/docker-data/nginx/
echo "====> Finished copy NGINX config ..."
```
The script above creates the expected Conda channel structure, and copies the NGINX configuration files to a place which will be found by the docker container.

To run the server you can run; `docker-compose up -d`


