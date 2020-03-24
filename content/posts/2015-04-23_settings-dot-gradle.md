---
title: "Gradle - always use settings.gradle"
date: 2015-04-23T10:02:44Z
draft: false
toc: true
images:
tags:
  - howto
  - gradle
  - devops
---
## Problem

I had an issue today where I was working with Jenkins and my release package was given the same name as the Jenkins job. For those of you familiar with Jenkins and the Git plugin, you will know that the workspace is given the same name as the job name, and the source is downloaded into the workspace. What you may not have known is that Gradle infers the name of the project from the root dir name.

## Solution

To overcome this issue its a good idea to set up a settings.gradle file to honour your projects name. Create `settings.gradle` in the root directory.

``` groovy
rootProject.name = 'myCoolProjectName'
```

This will also protect you in the open source world with Git where some users may choose to clone into a repository with a different name to what you originally set.

You may also wish to do this with your sub projects too. I find it makes working in an IDE more pleasant.

``` groovy
rootProject.name = 'myCoolProjectName'
findProject(':a-long-web-dir-name').name = 'web'
findProject(':a-long-api-dir-name').name = 'api'
```