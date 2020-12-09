---
title: "Artifactory: Node & Npm Mirror"
date: 2020-12-09T14:09:16Z
draft: false
tags:
  - artifactory
  - nodejs
---

If like myself you work in a corporate environment and you have policies which restrict you from downloading directly from the internet then you will need a proxy or mirror which can fetch the dependencies you need while keeping track of what you pull in. At my current company, we use Artifactory. This is a guide on how you can mirror Node and NPM repositories, for better control over what you pull into your company.

*Please note that I use mirror, remote and proxy interchangeably throughout this article.*

## Node
From the admin menu, select new remote and then create a new repository of type generic.
{{< figure src="/img/art_new_remote.png" caption="New Generic Repo">}}
If your company has a naming scheme, use that for the name, or simply use something descriptive. Then for the URL, use the same as the diagram below.
{{< figure src="/img/art_new_remote_conf.png" caption="Node Repo Config">}}

## NPM
Now create a new remote repository but this time make an npm type with the following configuration.
{{< figure src="/img/art_npm_remote.png" caption="NPM Repo Config">}}

## NVM
Here's a juicy little extra for those of you that also use node version manager. 

If you use NVM for managing your local installs and want to use your new proxy then simply run the following commands:

``` bash
nvm node_mirror https://artifactory-mycompany.com/artifactory/<your-node-repository-name>/
nvm npm_mirror https://artifactory-mycompany.com/artifactory/api/npm/<your-npm-repository-name>/```



 