+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-03-17T20:46:13+01:00"
menu = ""
tags = ["vagrant", "ec2", "aws", "docker", "microservice", "gradle", "ansible", "spring"]
title = "Vagrant, Amazon EC2, Docker and Microservices pt4."
+++

## The Microservice

For this tutorial I'm going to use a spring boot application that will help us prove the concepts behind this tutorial. There are loads of microservice frameworks to chose from, but for this tutorial we will use Spring Boot. Maybe in the future I will look at trying out some other popular frameworks. Links to the Spring guide are given at the bottom of this tutorial.

At this point we could cheat and do everything in Gradle. Here's a http://thediscoblog.com/blog/2014/06/13/docker-containers-with-gradle-in-4-steps/[handy tutorial] showing how to perform your build and docker run using Gradle.

## Docker

When I first started writing this article I had plans of going through a 101 for Docker. Since then I have found a fantastic youtube video called [Docker 101: Dockerizing Your Infrastructure](https://www.youtube.com/watch?v=4W2YY-qBla0&index=21&list=PLDF29927F90450C06) and I just don't think I can add anything to that excellent tutorial. So, rather than going from the foundations I have decided to assume you have watched that video.

Now that we can do the basics with Docker lets start setting our requirements for the container. First, we need java installed so that we can start our microservice. Then, it would be good if we could do some monitoring once the service is started. This is especially important if we plan on running this in a production setting. For that reason we're going to move away from ubuntu images, and use an extended version of the [baseimage](https://phusion.github.io/baseimage-docker/) image by Phusion. The image is called [flurdy/oracle-java7](https://registry.hub.docker.com/u/flurdy/oracle-java7/) and if we look at the Dockerfile for `flurdy/oracle-java7` we can see this image is using `phusion/baseimage:latest` and bootstrapping it with Java.

Lets start building our `Dockerfile`. I have created mine in `${projectDir}/app/docker`:

```
FROM flurdy/oracle-java7:latest
MAINTAINER willis7
EXPOSE 8080
ADD build/libs/gs-spring-boot-0.1.0.jar /opt/msvc/gs-spring-boot.jar
CMD java -jar /opt/msvc/gs-spring-boot.jar
```


With the FROM keyword Docker will first look for the image locally, then look to the public repo if it doesn't find it.

MAINTAINER simply tells the reader who the author of this Dockerfile is.


EXPOSE tells Docker that a port is to be exposed when the container is started. Now, lets add our build output to the container; we do that using the ADD keyword:

The ADD instruction basically takes a <src> and <dest>. If the <dest> path doesn't exist, it is created along with the missing directories along its path.

Finally, we need to tell Docker what command should be run when the container is executed. We do that with the CMD keyword.

And thats it!

If you look in my github repository you will find 2 helper scripts - one to build the image and the second to run it.

```
docker-build.sh
docker-run.sh
```

Lets run through the steps:

```
# Build the source code and run unit tests
$ cd app
$ .gradlew clean build

# Create and provision a VM
$ cd ..
$ vagrant up

# ssh into the box
$ vagrant ssh

# cd to the docker scripts
$ cd /vagrant/docker/

# docker build
$ . docker-build.sh

# docker run
$ . docker-run.sh

# test service running
$ curl localhost:8080
Greetings from Spring Boot!
```

At this point we could get Ansible to do all of these steps, but as this is a learning exercise its nice to go through the motions. If you were to add these steps, then we refactored earlier, so these would sit nicely in the Docker Playbook.

## Conclusion

This tutorial series has been a whistle stop tour through a few different tools and technologies. Whilst the example was extremely simple, hopefully you can see how this could be applied to a Continuous Delivery pipeline for on demand test environments. For the small effort up front in writing your scripts (which in this case were super simple!), you can save costs from not having "always on" environments that aren't being used. Also, because we provisioned the environments using a coded format, we can rest assured the environments are the same every time - we also get the luxury of being able to version control our scripts as a result.

If you have any questions or would like me to clarify anything in these tutorials then please feel free to add a comment below.


Resources:

* [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
* [Deploying Spring Boot-based microservices with Docker](http://plainoldobjects.com/2014/11/16/deploying-spring-boot-based-microservices-with-docker/)
