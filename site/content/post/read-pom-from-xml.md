+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-02-17T20:46:13+01:00"
menu = ""
tags = ["gradle", "maven", "pom"]
title = "Reading a POM from Gradle"
+++

Reading a Maven POM is Easy with Gradle and Groovy!

The inspiration for this post came from the post here:
[Reading info from existing pom.xml file using Gradle?](https://stackoverflow.com/questions/11558157/reading-info-from-existing-pom-xml-file-using-gradle)

Naively I implemented the first solution which is given below.

``` groovy
defaultTasks 'hello'

repositories {
  mavenCentral()
}
configurations {
  mavenAntTasks
}
dependencies {
  mavenAntTasks 'org.apache.maven:maven-ant-tasks:2.1.3'
}

task hello << {
  ant.taskdef(
    resource: 'org/apache/maven/artifact/ant/antlib.xml',
    uri: 'antlib:org.apache.maven.artifact.ant',
    classpath: configurations.mavenAntTasks.asPath)

  ant.'antlib:org.apache.maven.artifact.ant:pom'(id:'mypom', file:'pom.xml')
  println ant.references['mypom'].version
}
```

Now, this solution did meet the original posters requirement. However, after running the hello task I was surprised to see
a few libs being downloaded which didn't feel slick.

In true groovy fashion this could be achieved much more simply using the code below:


``` groovy
def pom = new XmlSlurper().parse(new File('pom.xml'))

println 'my pom version ' + pom.version
```