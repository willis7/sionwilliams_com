---
title: "DevOps transformation: a case study"
date: 2020-03-24T14:02:31Z
draft: false
toc: true
images:
tags:
  - devops
  - culture
  - leadership
---

> This article was first published on my clients company blog. I have renamed the projects for anonymity, and the engineer names are made up. However, the story is very real!

## Introduction
We have been talking about DevOps for a long time at AwesomeCorp, so I'm sure several people are wondering when they will see it. The purpose of this post is to share the journey (so far) since assembling a Unicorn product team and growing DevOps capabilities.

To start, we need a bit of history. Unicorn is a workflow management tool built using a collection of Oracle technologies (or middlewares) that enable Business Process Management and Service-Oriented Architecture. The value proposition of this technology was its ease of use and customizability, which in turn meant the business could configure the workflows as they wanted with minimal effort.

Developed originally by NotSoAwesome3rdParyCorp, their remit was to take the functional requirements of CMS Tibco and replicate them on the new platform exactly. In hindsight, this was a terrible idea but let's not forget the promise of the technology which was to be highly customisable and easy to change.

As with the adoption of any new technology, it's impossible to become an expert overnight. Unfortunately, due to strict deadlines and a lack of knowledge, many poor decisions were made that resulted in an unstable platform. Shortly after the delivery of the platform, our support contract with NotSoAwesome3rdParyCorp ended. At this point, we failed to remediate the environments, and we had no change capability. This was when we decided to freeze all change on Unicorn.

Fast forward to 2019. After four years of helping startups and large corporations on their own DevOps journeys, I have returned to help AwesomeCorp on theirs. Much like any transformation, you have two options; change the whole organisation big bang, or start small and transform through osmosis. I chose to start small and work with an individual team and technology. 

## Growing DevOps capabilities
If you've spent any time in the DevOps confluence space, you would have spotted the DevOps capability map. The map, which was highly influenced by the analysis of the latest State of DevOps report, is a way for us to understand better the capabilities we need to reach our goals of; minimising cycle time, improving quality and building the right culture.

Below is a real study of growing those capabilities in the Unicorn product team.

### Visualising Work
In the first instance, it was essential to ring-fence a team. At the time, I could only steal a developer and a single environments manager, Jane and Bill, respectively. As both engineers are SME's across many services, I knew it would be hard to get complete visibility of their work. Still, we started by reviving an old Jira project and insisting all work flowed through that single backlog. This included long-running projects that had their own Jira projects, such as GDPR. Some might argue that this is unnecessary duplication, but I think the benefit of transparency outweighs the overhead from repetition.

### Infrastructure as code. 
For any team to be able to change an environment safely, there must be a mechanism by which they can return to a known good-working baseline. We needed to get a grasp of the environments that we were changing, and we did that by reverse-engineering the environment configuration into software artefacts. Having these artefacts has meant we can drop and create environments at our discretion. While we don't currently have this plugged into any automation, I would argue the hardest part is complete.

When asked why I didn't opt for the snapshot restore mechanism that's prevalent in AwesomeCorp, my answer is simple; that's not DevOps. `<takes tongue out of cheek>` In reality, I have enough experience to know that eventually, we may wish to migrate hosting provider, upgrade OS's and upgrade middleware. I have done this enough times to know I would much rather have the configuration scripts than try to unpick an environment at the point I need to move. It's an upfront investment that pays dividends over the long run. Ask yourself; how many other environments spin up purely from scripts?

### Agile adoption
We didn't talk about this as a team; it was a given that Agile was the right delivery method. However, we did agree to be agile about our Agile adoption. In reality, this meant we didn't go wild adopting Agile ceremonies. Very early on in the process, we only arranged sprint planning sessions. We had no standups, no show and tells and no retrospectives. However, it quickly became apparent that we needed to add refinement sessions. Not having clear acceptance criteria, or worse, creating it as we went didn't yield the best results. As a result story pointing became a finger in the air assessment, and we we'rent achieving what we committed to.  Lesson learned.

### Version Control
It quickly became evident that if we hoped to accelerate our ability to add new features, we would need some external Oracle experience. Enter Alejandro! Alejandro hit the ground running when he joined, and his first recommendation was to decompose the git repositories. His experienced suggestion was to create a repository per component (SOA, BPM, ADF, Database, etc.) so that each component could have its own delivery pipeline without the need for complex deployment logic. The benefit now is that our Git repositories align precisely to the components in Jira. This will prove useful as the backlog grows, and we start pushing more change. With this data, we will know what components change most and can fill skills gaps accordingly.

### Shift-left testing
The service-oriented architecture needed a different test strategy to support agility and speed of delivery. SOA applications typically use lots of small services that communicate over the network to produce a complete system. Unlike a monolithic application, this meant that we needed to focus effort at the network boundary as well as the unit test level. This is in contrast to a monolithic application, where interdependent modules are validated by wiring multiple unit tests to form integration tests. The benefit of a SOA architecture is that the development teams can write the checks and verify the services without needing to test all 80+ components. In turn, it means that we can achieve an exceptionally high level of confidence from lower-level tests, and reduce our dependence on full regression tests.

### Continuous Integration
While we may not have strictly reached "Continuous integration" in the purest sense, we have done the following.
* introduced trunk-based workflow
* created a test build server
* broken build scripts to support the modularised build system

When we add our production build server and improve our Git tooling, we will be able to say we have Continuous Integration.

### Improved Monitoring
Very early days on this one, but we have expanded our use of Splunk for log aggregation and have a backlog full of features we would like to introduce.

### Autonomous Team
Another area that we have reasonably low maturity in, but I believe that's true for the wider organisation. In some way's we're more fortunate than others because we have a product owner. James has a fantastic knowledge of the product, and as a user himself, he's very mindful of the needs of users. The challenges we face in this area are around how we coexist with a project aligned organisation. Until we move to a product aligned organisation, I have chosen to use an Epic in our Jira project to represent the project. This means we can continue to promote Agile, while also supporting our project management friends' deliveries.

### Loosely coupled architecture
This should mostly be an architecture problem, but in reality, it's proving to be more of a behavioural problem. We have a learned behaviour that a feature cannot progress unless both systems make a change at the same time. 
As part of the Unicorn DevOps transformation, I have tried to break that mentality by impressing the need to add business value over architectural perfection. For example, `JIRA-720` is a task for automatically completing cases when they are auto-completed in PhoenixApp. Currently, when cases are closed in PhoenixApp a csv is created, and then a user manually closes the cases in Unicorn. The best scenario would have been for the auto-completion procedure in PhoenixApp to make an API request to Unicorn and close the cases programmatically. Because we had no resource to deliver the PhoenixApp change, we decided to add some technical debt. We created the API to close the cases, but we also created a new service to consume the csv and call our own "close case" API. Eventually, when the PhoenixApp team are in a position to implement the call to our API, we can remove the technical debt (the csv slurper), and we arrive at our better implementation. The main takeaway here is that we added business value, at the cost of some technical debt. This technical debt will remain in our backlog until it's removed.

## Conclusion
I'm very proud of the engineers. I created the team without any warning and put people in uncomfortable positions daily. Still, I think the team has achieved a fantastic amount in a short period. We may not have been releasing fancy features every week, but we have built a strong foundation so that we can bare the incoming load. With all of the environments stored as code, we can perform an upgrade relatively safely - as safe as you can hope for without an automated test suite to boot.
There is much more work to be done on Unicorn. We still have a lot of technical debt in the backlog, but I hope we will adopt a 20% tech debt contribution each sprint. Only then can we move away from big expensive projects like "sustainability".