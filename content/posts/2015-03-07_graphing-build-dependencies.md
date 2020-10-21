---
title: "Dependency Management - Modeling Suppliers and Consumers pt.1"
date: 2015-03-07T10:02:44Z
draft: false
toc: true
images:
tags:
  - howto
  - engineering
  - devops
---

Dependency management has come a long way over the past 10 years, but I believe it has some way to go before we can say the problem is solved.

Consider the scenario where you have developed a library which inadvertently introduced a severe security vulnerability. Because your organisation believes in reuse it has been used in many different projects. The Maven POM (Project Object Model) does a good job in providing us with meta-data about the modules which are _suppliers_ to a project, but it doesn't capture information about who the _consumers_ are.

So, we have a dangerous library in the wild, but we cant say with any certainty who is consuming it. At this point the only solution is to trawl through every projects POM and look to see if you have declared this library as a dependency. This is going to make your day very unpleasant if you have more than a hand full of projects, and if you've moved in the direction of microservices then this is going to be hell!

## A potential solution

As I mentioned earlier a Maven POM provides us with a way of describing what dependencies a project has. These are identified using a standard set of attributes; _groupId_, _artifactId_ and _version_. There are other attributes, but we will ignore them for now.

* _groupId_ - a macro group or family of projects or archives to which a project belongs. For example, +org.hibernate+ and +org.richfaces.ui+
* _artifactId_ - the unique identifier of the project among the projects sharing the same +groupId+. For example, +junit+, +hibernate-annotations+, and +richfaces-components-ui+.
* _version_ - a version number.

Lets turn our dependency tree into a graphical representation:

{{< figure src="/img/dependencies.png">}}

Wouldn't it be good if we could store all of these project graphs in a single location where they could establish relationships with other projects?

We're already talking about graphs, so wouldn't a graph database be a good place to start?

### Describing the domain

The underlying data model of a graph database is whats called the Property Graph data model. Essentially, it means that we will be storing our data in a graph database, and that we will be using vertices and edges(or nodes and relationships) to persist our data.

This works really well for the problem we're trying to solve because we're talking about artifacts (nodes), and their relationships with each other artifacts. Lets look at some code:

``` java
@NodeEntity
public class Artifact {

    @GraphId Long id
    String groupId
    String artifactId
    String version

    @RelatedTo(type = "DEPENDS_ON", direction = Direction.OUTGOING)
    public @Fetch Set<Artifact> dependencies


    public void dependsOn(Artifact artifact) {
        if ( !dependencies ) {
            dependencies == new HashSet<Artifact>()
        }
        dependencies.add(artifact)
    }
}
```

NOTE: I'm using Spring heavily here - this may look unfamiliar if you don't know Spring.

Here you can see I've constructed the node using the attributes I defined earlier. There is an id which is annotated with `@GraphId` that Neo4j uses to track the data, a groupId, artifactId and version. Inside this node entity I have also defined a `Set<Artifact>` of dependencies marked up as `@RelatedTo`. This means that every member of this set is expected to also exist as a separate `Artifact` node, and this node `DEPENDS_ON` them.

So, this concludes part 1. Pt2 coming soon..
