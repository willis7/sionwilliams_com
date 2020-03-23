+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-03-10T20:46:13+01:00"
menu = ""
tags = ["gradle"]
title = "The GradleBuild task"
+++

## task myTask(type: GradleBuild) { }

If you have ever imported another build using `apply from: "${rootDir}/gradle/publish.gradle"` then you will appreciate how its a little difficult to know exactly what has been applied to your build by said `apply` action.

I often use this pattern when I want to clearly seperate the parts of my build. In my build scripts you may see something like:

```
apply from: "${rootDir}/gradle/sonar.gradle"
apply from: "${rootDir}/gradle/acceptance-testing.gradle"
apply from: "${rootDir}/gradle/deploy.gradle"
apply from: "${rootDir}/gradle/publish.gradle"
```

This is very clear and works very well, but sometimes I just don't need to be notified of all the tasks a build file imports.

In those cases a nicer solution may be to use the GradleBuild task type as shown below.

```
task publish(type: GradleBuild) {
    buildFile = "${rootDir}/gradle/publish.gradle"
    tasks = ['publishGhPages']
}
```

I think this is really clear, and if you run `gradle tasks` you should find all other tasks from that build file ommitted.
