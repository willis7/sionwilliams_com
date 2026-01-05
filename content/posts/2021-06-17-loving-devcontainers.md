---
title: "VSCode: fanboying over devcontainers"
date: 2021-06-17T21:13:43Z
draft: false
toc: false
images:
tags:
   - dev
   - vscode
   - hugo
   - docker
   - howto
---

I've been working with Azure recently and was introduced to the [Rover](https://github.com/aztfmod/rover), a fully provisioned container for working with Azure Terraform. I hadn't appreciated Microsoft's ability to create environments using containers that VSCode can then connect to in an OS-agnostic and portable way. I mainly use my Mac as a dev machine, but I use my gaming PC to do the odd coding task every now and then. Jumping between these devices can be a bit of a pain because I have to set them up the same way. This always comes with some nuance because of the difference between the operating systems.

Below is an example of the dev container that I used to build this blog using Hugo:

```json
// FILE: .devcontainers/devcontainer.json
// For format details, see https://aka.ms/vscode-remote/devcontainer.json or this file's README at:
// https://github.com/microsoft/vscode-dev-containers/tree/v0.128.0/containers/hugo
{
  "name": "Hugo",
  "build": {
    "dockerfile": "Dockerfile",
    "args": {
      // Update VARIANT to pick hugo variant.
      // Example variants: hugo, hugo_extended
      // Rebuild the container if it already exists to update.
      "VARIANT": "hugo_extended",
      // Update VERSION to pick a specific hugo version.
      // Example versions: latest, 0.73.0, 0,71.1
      // Rebuild the container if it already exists to update.
      "VERSION": "latest"
    }
  },
  // Set *default* container specific settings.json values on container create.
  "settings": {
    "terminal.integrated.shell.linux": "/bin/zsh"
  },
  // Add the IDs of extensions you want installed when the container is created.
  "extensions": ["bungcip.better-toml", "davidanson.vscode-markdownlint"],
  // Use 'forwardPorts' to make a list of ports inside the container available locally.
  "forwardPorts": [1313],
  // Use 'postCreateCommand' to run commands after the container is created.
  // "postCreateCommand": "uname -a",
  // Uncomment to use Docker from inside the container. See https://aka.ms/vscode-remote/samples/docker-from-docker.
  // "mounts": [ "source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind" ],
  // Uncomment when using a ptrace-based debugger like C++, Go, and Rust
  // "runArgs": [ "--cap-add=SYS_PTRACE", "--security-opt", "seccomp=unconfined" ],
  // Uncomment to connect as a non-root user. See https://aka.ms/vscode-remote/containers/non-root.
  "remoteUser": "vscode",
  "shutdownAction": "stopContainer"
}

```
And the `Dockerfile`:
```yaml
// FILE: .devcontainers/Dockerfile
FROM golang:1.13-alpine

# VARIANT can be either 'hugo' for the standard version or 'hugo_extended' for the extended version.
ARG VARIANT=hugo_extended
# VERSION can be either 'latest' or a specific version number
ARG VERSION=latest

RUN apk add --update --no-cache ca-certificates openssl git curl && \
    case ${VERSION} in \
    latest) \
    export VERSION=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest | grep "tag_name" | awk '{print substr($2, 3, length($2)-4)}') ;;\
    esac && \
    echo ${VERSION} && \
    wget -O ${VERSION}.tar.gz https://github.com/gohugoio/hugo/releases/download/v${VERSION}/${VARIANT}_${VERSION}_Linux-64bit.tar.gz && \
    tar xf ${VERSION}.tar.gz && \
    mv hugo* /usr/bin/hugo && \
    go get github.com/yaegashi/muslstack && \
    muslstack -s 0x800000 /usr/bin/hugo

FROM mcr.microsoft.com/vscode/devcontainers/base:0-alpine-3.12
# Required for hugo_extended
RUN apk add --update --no-cache libc6-compat
COPY --from=0 /usr/bin/hugo /usr/bin
EXPOSE 1313
WORKDIR /src
CMD ["/usr/bin/hugo server"]
```
Credit to Exavolt for the [Gist](https://gist.github.com/exavolt/80cbdf4148fac42ab367eea793b8d4ac).


Working on my blog is as simple as cloning the repo and running the build in the container. I get the hot reloads and everything run as transparent as when I had the tools installed natively on my machine. As always, the docs from Microsoft are fantastic. To read more, I highly recommend the following articles:

* https://code.visualstudio.com/docs/remote/containers
* https://spin.atomicobject.com/2021/06/15/developing-docker-vs-code
