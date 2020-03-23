+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2018-05-22T00:01:13+01:00"
menu = ""
tags = ["jenkins"]
title = "SBT to Gradle"
+++

Here's how I made the switch from sbt to gradle for a play project.

Sbt works, there's no denying that, but having spent many years working with Gradle I found it frustrating to replicate what was very simple with Gradle. My current clients play application is built with sbt; you can find a link to the build [here](https://github.com/ONSdigital/sbr-control-api/blob/b7c25482773bd976a074ee2ff74b9b02188b9f25/build.sbt). Here's a snippet from `build.sbt`

``` scala
import play.sbt.PlayScala
import sbtbuildinfo.BuildInfoPlugin.autoImport._
import sbtassembly.AssemblyPlugin.autoImport._
import com.typesafe.sbt.SbtNativePackager.Universal
import com.typesafe.sbt.packager.docker.DockerPlugin.autoImport.dockerExposedPorts

val publishRepo = settingKey[String]("publishRepo")

licenses := Seq("MIT-License" -> url("https://github.com/ONSdigital/sbr-control-api/blob/master/LICENSE"))

publishRepo := sys.props.getOrElse("publishRepo", default = "Unused transient repository")

// key-bindings
lazy val ITest = config("it") extend Test

lazy val Versions = new {
  val scala = "2.11.11"
  val appVersion = "0.1-SNAPSHOT"
  val scapegoatVersion = "1.1.0"
}

lazy val Constant = new {
  val appName = "control-api"
  val projectStage = "alpha"
  val organisation = "ons"
  val team = "sbr"
}

lazy val Resolvers = Seq(
  Resolver.typesafeRepo("releases"),
  "Hadoop Releases" at "https://repository.cloudera.com/content/repositories/releases/"
)

lazy val testSettings = Seq(
  sourceDirectory in ITest := baseDirectory.value / "/it",
  resourceDirectory in ITest := baseDirectory.value / "/test/resources",
  scalaSource in ITest := baseDirectory.value / "/it",
  // test setup
  parallelExecution in Test := false
)

lazy val publishingSettings = Seq(
  publishArtifact := false,
  publishTo := Some("Artifactory Realm" at publishRepo.value),
  releaseTagComment := s"Releasing $name ${(version in ThisBuild).value}",
  releaseCommitMessage := s"Setting Release tag to ${(version in ThisBuild).value}",
  // no commit - ignore zip and other package files
  releaseIgnoreUntrackedFiles := true
)
```

It's just code - but for many, myself included, it's too verbose and not particularly expressive. Compare the same to `build.gradle` and I think you will agree it's much nicer.

``` groovy
plugins {
    id 'play'
}

repositories {
    mavenLocal()
    jcenter()
}

ext {
    scalaVersion = "2.11"
    playVersion = "2.5.18"
}

dependencies {
    play "com.sksamuel.scapegoat:scalac-scapegoat-plugin_${scalaVersion}:1.0.0"
    play "com.typesafe.play:play-cache_${scalaVersion}:${playVersion}"         // cache
    play "com.typesafe.play:filters-helpers_${scalaVersion}:${playVersion}"    // filters
    play "com.typesafe.play:play-netty-server_${scalaVersion}:${playVersion}"
    play "com.typesafe.play:play-logback_${scalaVersion}:${playVersion}"
    play "com.typesafe.play:play-ws_${scalaVersion}:${playVersion}"            // ws
    play "com.typesafe.play:twirl-api_${scalaVersion}:1.1.1"
    play "com.typesafe.scala-logging:scala-logging_${scalaVersion}:3.5.0"
    play "io.lemonlabs:scala-uri_${scalaVersion}:0.5.0"
    play "com.typesafe:config:1.3.1"
    play "io.swagger:swagger-play2_${scalaVersion}:1.5.3"
    play "org.apache.hadoop:hadoop-common:2.6.0"
    play "org.apache.hbase:hbase-client:1.0.0"
    play "org.apache.hbase:hbase-common:1.0.0"
    play "org.webjars:swagger-ui:3.1.4"
    play "org.webjars:webjars-play_${scalaVersion}:2.5.0-3"

    playTest "org.scalatestplus.play:scalatestplus-play_${scalaVersion}:2.0.0"
    playTest "org.scalatest:scalatest_${scalaVersion}:3.0.4"
    playTest "com.github.tomakehurst:wiremock:1.58"
    playTest "org.scalamock:scalamock_${scalaVersion}:4.1.0"
}

model {
    components {
        play {
            platform play: "${playVersion}", scala: "${scalaVersion}", java: '1.8'
            injectedRoutesGenerator = true
            tasks.withType(RoutesCompile) {
                additionalImports = ['extensions.Binders._']
            }
            binaries.all {
                tasks.withType(PlatformScalaCompile) {
                    scalaCompileOptions.additionalParameters = [
                        "-language:experimental.macros",
                        "-target:jvm-1.8",
                        "-encoding", "UTF-8",
                        "-language:reflectiveCalls",
                        "-language:experimental.macros",
                        "-language:implicitConversions",
                        "-language:higherKinds",
                        "-language:postfixOps",
                        "-deprecation", // warning and location for usages of deprecated APIs
                        "-feature", // warning and location for usages of features that should be imported explicitly
                        "-unchecked", // additional warnings where generated code depends on assumptions
                        "-Xlint", // recommended additional warnings
                        "-Xcheckinit", // runtime error when a val is not initialized due to trait hierarchies (instead of NPE somewhere else)
                        "-Ywarn-adapted-args", // Warn if an argument list is modified to match the receiver
                        "-Ywarn-value-discard", // Warn when non-Unit expression results are unused
                        "-Ywarn-inaccessible", // Warn about inaccessible types in method signatures
                        "-Ywarn-dead-code", // Warn when dead code is identified
                        "-Ywarn-unused", // Warn when local and private vals, vars, defs, and types are unused
                        "-Ywarn-numeric-widen" // Warn when numerics are widened
                        ]
                }
            }
        }
    }
}

tasks.withType(PlayRun) { 
    httpPort = 9010
}
```

I think you will agree this is much cleaner.