---
title: "Spotify Backstage at LV"
date: 2022-09-08T21:27:00+01:00
draft: false
toc: true
images:
tags:
  - backstage
---

Any engineer who has started a new project will know how time-consuming bootstrapping a new repo can be. You have to configure your build scripts, configure your test tool, add your pipeline scripts and so on. Most of the time, we get into a build fix cycle because the most obvious thing to do is copy and paste from another similar repository. When we first build the project, it inevitably fails because we forget to change a copied variable from the old project. We make the fix and build again.

## Our build framework
We have converged on [Gradle](https://gradle.org/) as our primary build system. Some of our early projects used Maven, but the problem was it was pretty limiting for our non-JVM projects. Gradle has a fantastic plugin ecosystem which is easy to extend for more exotic use cases. As we work with languages such as PLSQL, Javascript and a few others, our mission was to have one build framework that could rule them all. Using Gradle means that developers need to learn one build framework, leading to smoother transitioning between projects. This had the added benefit that we could standardise task names and also the build pipeline. Some people will remind me that Maven is also extendable, but wrangling that much XML is a real PITA.

## Pipelines
There have been some great tools in this space for a long time; [CircleCI](https://circleci.com/), Github Actions, and Azure DevOps. However, as we already had a large [Jenkins](https://www.jenkins.io/) deployment, it made sense to stick with that. Most of our recent effort has been spent on converting freestyle jobs to pipeline jobs. As a result, we are slowly reaching a point where most of our repositories have adopted a standard Jenkinsfile that contains the following typical steps:
- Compiling/Building your code and artefacts
- Code Linting
- Unit Test
- Static analysis
- Dependency-Check
- Mutation Test, aka. Fuzzing/Fuzz Testing
- Integration Test
- Package & Publish
- Deploy: QA
- Acceptance Test
- Functional Test
- Security Scan
- Contract/API Testing
- Performance Testing
- Chaos Testing
- Promote: Release Package
- Deploy: Prod
- Smoke Test

When automating bootstrapping, we wanted all projects to follow this standard.

## Introducing Backstage
Before the age of the microservice, our build managers would bootstrap projects infrequently. However, now they can be creating upwards of 5 services per solution. This became tiresome and inefficient, so we looked for an automated solution. 
At first, we considered self-service through Jira. Given we were using that to track most team requests, it made a lot of sense. I was in the middle of writing a service to do this when I learned about a newly open-sourced project called [Backstage](https://backstage.io/) from Spotify. 
As early adopters, we had to fill in many gaps during deployment. Documentation was a bit sketchy, and we had to debug our way through a few issues. As we fed back some fixes to the community and the product became more stable, we decided to do a soft launch on one of our lab machines. 
Below is a list of some features and how we use them.

### Backstage Software Templates
As of today, we only have one template in Backstage. It's a Spring Boot microservice fully loaded with all the above bootstrapping; build scripts, pipelines, container config, k8 config etc. We have ambitions to create a frontend and ML template, but the demand hasn't been there yet.
The template feature is self-service and intuitive. An engineer navigates to a form, answers questions such as "Do you need K8 config" and Backstage pops out a new project in Github with the desired features.

{{< figure src="/img/image_1662640462475_0.png" alt="backstage software templates">}}

### Technology Radar
I really like this feature. Unfortunately, while we have populated ours, it isn't yet our golden source. To anyone looking to adopt the technology radar approach, I would strongly recommend setting up a quarterly review session of what's in, out or moving around. This will engage people to use it; over time, you should find it will become the golden source. 
A health warning should come with a technology radar; if you stick to it religiously, you could stifle innovation. A quarter is a long time to wait to review new technology, and some people might not be prepared to wait. Either stuff will get used that isn't recognised by your Radar, or people won't try things that haven't been approved by the Tech Radar governing body. You have been warned.

{{< figure src="/img/image_1662632688165_0.png" alt="backstage tech radar">}}

### TechDocs
This is another excellent feature, but in all honesty, with Confluence already embedded in our org, we didn't push this feature. We understand the value of docs with code, but in reality, we're not an engineering-led organisation. Getting people to check out code repositories to update docs is a bit of a stretch.

### Software Catalogue
Add a `catalog-info.yaml` to your service or library, and away you go. There isn't much to say about this feature which isn't already stated in the docs. We love it.

{{< figure src="/img/image_1662632841453_0.png" alt="backstage tech radar">}}

### Custom Plugins
Given our use case and the number of features in Backstage, some people might question our reason for using it, and rightly so. The primary use case was to create templates for developers, and let's be honest [cookie cutter](https://github.com/cookiecutter/cookiecutter) could have achieved that for a lot less hassle. However, there were other problems we needed to solve, and we didn't want to build something from scratch. Take the diagram below.

{{< figure src="/img/image_1662632322371_0.png" alt="backstage tech radar">}}

ServiceNow is an expensive tool to license. We can't give everyone a licence as it is too costly. However, within the terms of use, it is possible to use the API to pull some high-level data out. In the image above, you see a plugin we created in Backstage to pull high-level stats directly from ServiceNow. I have omitted data for company confidentiality, but you get the gist.

## Conclusion
Backstage is a feature-rich platform that dramatically improves my organisation's developer experience. While our usage is still lightweight, we have already seen productivity gains. I must admit, our use didn't justify adopting a platform, which Backstage is, but I am glad we did. The more we integrate our tools, such as Github, SonarCloud etc., the more value we unlock. We will soon incorporate our Cloud Cost Management into Backstage, but you will have to wait for a follow-up blog entry for the details on that one.

