---
title: "Gradle Multiple Test Sourceset Coverage"
date: 2020-10-01T13:47:40+01:00
draft: false
tags:
  - gradle
  - jacoco
---

# Problem

I want to categorise my tests, but I also want to see their respective code coverage using Jacoco.

# Solution

Tested on Gradle v6.0.1.

When all your tests live in the `test` source set, you can simply [follow the documentation](https://docs.gradle.org/current/userguide/jacoco_plugin.html). However, if you structure your tests more granularly, like this:

```
.
├── src
│   ├── cdcTest
│   │   ├── java
│   │   └── resources
│   ├── e2eTest
│   │   ├── java
│   │   └── resources
│   ├── intTest
│   │   ├── java
│   │   └── resources
│   ├── main
│   │   ├── java
│   │   └── resources
│   └── test
│       ├── java
│       └── resources

```
Then you will need to create additional sourcesets. I like to store these as build scripts, but you can put all this in one `build.gradle` if that suits your use case.

``` groovy
// File: ./gradle/integration-test.gradle
sourceSets {
    intTest {
        compileClasspath += sourceSets.main.output
        runtimeClasspath += sourceSets.main.output
    }
}

configurations {
    intTestImplementation.extendsFrom implementation
    intTestRuntimeOnly.extendsFrom runtimeOnly
}

dependencies {
    intTestImplementation('org.springframework.boot:spring-boot-starter-test') {
		exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
	}
    intTestImplementation 'junit:junit:4.13'
    intTestImplementation 'com.github.tomakehurst:wiremock:2.25.1'
}

task integrationTest(type: Test) {
    description = 'Runs the integration tests.'
    group = 'verification'

    testClassesDirs = sourceSets.intTest.output.classesDirs
    classpath = sourceSets.intTest.runtimeClasspath
    shouldRunAfter test

    outputs.upToDateWhen { false }

    testLogging {
        events "passed", "skipped", "failed"
    }
}

check.dependsOn integrationTest
```

Then I apply this in `build.gradle` like so:

``` groovy
// File: ./build.gradle
...
repositories {
	jcenter()
}

apply from: "$rootDir/gradle/integration-test.gradle"
apply from: "$rootDir/gradle/contract-test.gradle"
apply from: "$rootDir/gradle/e2e-test.gradle"

...
```

You can see in this example I have a few different types of test sources. To do the same it's simply a rinse and repeat. I could use a list to generate multiple source sets programatically, but I prefer to be verbose here.

For code coverage we just need to update `./gradle/integration-test.gradle` with the following block.

``` groovy
// File: ./gradle/integration-test.gradle
...
task jacocoIntTestReport(type: JacocoReport) {
    description = 'Generates code coverage report for the integrationTest task.'
    group = 'verification'

    sourceSets sourceSets.main
    executionData integrationTest

    reports {
        xml.enabled true
    }

    mustRunAfter integrationTest
}
...
```