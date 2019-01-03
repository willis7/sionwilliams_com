+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-03-09T20:46:13+01:00"
menu = ""
tags = ["vagrant", "ec2", "aws", "docker", "microservice", "gradle"]
title = "Vagrant, Amazon EC2, Docker and Microservices pt2."
+++

## Part 2

In the first part of this tutorial, we showed how to use Vagrant to automate and manage an Amazon EC2 instance. We defined a simple Vagrantfile to specify certain attributes for an instance to run, and got it running using Vagrant's command line tools. In this part of the tutorial, we'll be using Puppet to define and automate the configuration details for our instance. This way, whenever we start up the environment with `vagrant up`, it will be set up to run Docker without any additional manual configuration.

## Docker and Puppet

The documentation for Docker is very good. Let's use that to drive the requirements of our puppet scripts:

[Installing Docker on Ubuntu Trusty 14.04 (LTS) (64-bit)](https://docs.docker.com/installation/ubuntulinux/)

Lets start by setting up our puppet dev environment:

```
# create a dir for puppet scripts from project root
$ mkdir manifests

# change directory
$ cd manifests/

# create a default manifest file for vagrant
$ touch default.pp
```

First thing we will want to do on our newly created instance is ensure the +apt-get+ package database is up to date. This can be achieved with the following block:

```
exec { "apt-get update":
  path => "/usr/bin",
}
```

Once thats complete we will want to install the docker package:

```
package { "docker.io":
  ensure  => present,
  require => Exec["apt-get update"],
}
```

NOTE: here we have built a dependency in Puppet. We are saying we don't want to continue with this task until the execution of apt-get update is complete.

At this point we have a bit of a chicken and egg situation. We want to run Puppet on our box to provision it, but Puppet isn't currently installed. We can use the shell provisioner to solve that initial problem.

```
config.vm.provision :shell do |shell|
   shell.inline = "sudo apt-get install -y puppet-common"
 end
```

NOTE: the +-y+ is a nice trick which we use to force a 'yes' when prompted if we want to continue.

Since we have placed our puppet script in the default location all we need to do is add the following line to the Vagrantfile.

`config.vm.provision :puppet`

And thats it!! We can test this works by running `vagrant ssh` followed by a `sudo docker run -i -t ubuntu /bin/bash`. If all is well then you should see something similar to:

```
Unable to find image 'ubuntu' locally
Pulling repository ubuntu
2d24f826cb16: Download complete
511136ea3c5a: Download complete
fa4fd76b09ce: Download complete
1c8294cc5160: Download complete
117ee323aaa9: Download complete
```

Resources:

* [How to Jumpstart Linux Development with Puppet and Vagrant, Part Two](http://www.linux.com/learn/tutorials/696255-jumpstart-your-linux-development-environment-with-puppet-and-vagrant)
