---
title: "Leading the Transformation: Applying Agile and DevOps Principles at Scale"
date: 2019-06-24T10:02:44Z
draft: false
toc: false
images:
tags:
   - leadership
   - highlights
---
[Leading the Transformation: Applying Agile and DevOps Principles at Scale](https://amzn.to/2Qgl0E9)
By Gary Gruver, Tommy Mouser, and Gene Kim


```traditional organizations are finding it more and more difficult to compete in the marketplace and deliver the software innovations that their businesses require. Their current software delivery approaches are constraining their businesses and limiting their ability to compete.```
                

```most of the time individual teams can’t independently deliver value to the customer because it requires integrating work across hundreds of developers and addressing all the inefficiencies of coordinating this work.```
                

```how teams come together to deliver value in large organizations is the first-order effect, while how individual teams work was a second-order effect.```
                

```Once the business objectives and continuous improvement process are in place, executives can start changing development processes by applying Agile and DevOps principles at scale. This will require two big changes: applying Agile principles to the planning process and using DevOps to address the basic Agile principle of being able to economically release smaller batches of changes on a more frequent basis.```
                

```Traditional implementations that focus on scaling small Agile teams across the organization are very different from applying Agile and DevOps principles at scale. Executives play a key role in communicating the advantages of the latter approach and in explaining how it differs from what is typically done in the industry.```
                

```Software development is such a discovery process that many of the assumptions made in the planning stage quickly become obsolete during development.```
                

```Executives need to understand that the capacity of the organization to absorb change is the biggest constraint to rolling out these improvements.```
                

```Therefore, as leaders we feel it is important, wherever possible, to provide the framework with the objectives and let the team have as much design flexibility in defining how the work will get done. It provides them with more interesting work, and they take more ownership of the results. In addition, when the situation changes, those doing the work are likely to sense it and adapt more quickly than an executive would.```
                

```Having the executives and managers leading the transformation by setting the business objectives and running the continuous improvement process engages them in the transformation.```
                

```We just set in play a continuous improvement process where we would set objectives and review results each iteration.```
                

```This transformation is going to take a lot of effort, and if you don’t have clear business objectives driving the journey, you can’t expect the transformation to provide the expected business results.```
                

```After defining business objectives, the next important step in transforming your development process is creating an enterprise-level continuous improvement process.```
                

```Executives need to engage in the process to ensure you experience the most important principle of Agile development: learning and adjusting along the way.```
                

```Executives need to establish strategic objectives that make sense and that can be used to drive plans and track progress at the enterprise level.```
                

```While it includes some team-level stories, it more importantly focuses on the enterprise-level deliverables. Executives work with the organization to set these kinds of objectives so that everyone feels they are important and achievable. They also make sure the objectives are based on what the teams are actually doing and achieving. This kind of collaboration helps build a culture of trust.```
                

```The leadership team would then spend most of their days walking the floor trying to understand where we were struggling and why. This is a new role for most executives and one we encourage executives to embrace if this process is going to be successful.```
                

```With this kind of trust comes transparency and with transparency comes a greater ability to fix issues quickly.```
                

```most executives are unfamiliar with the unique characteristics of software development or the advantages of Agile.```
                

```Software is infinitely flexible. It can be changed right up to the time the product is introduced.```
                

```More investment can result in better accuracy up to a point, until you start reaching diminishing returns on your investment.```
                

```Therefore, organizations need to decide whether their primary objective is to deliver long-term accurate plans to its executives or if it is to deliver business value to its customers.```
                

```the biggest inherent advantage of software is its flexibility,```
                

```Applying DevOps and Agile principles at scale in the enterprise requires developing processes that will enable the organization to economically release smaller batches of code on a more frequent basis.```
                

```Applying these concepts at scale is typically the source of the biggest breakthroughs in improving the efficiency and effectiveness of software development in large organizations, and it should be a key focus of any large-scale transformation```
                

```There are five main objectives that are helpful for executives to keep in mind when transforming this part of the development process so they can track progress and have a framework for prioritizing the work.```
                

```Develop an automated deployment process that will enable you to quickly and efficiently find any deployment or environment issues```
                

```Remove the duplication of work that comes from supporting multiple branches of similar code```
                

```Applying DevOps principles at scale is all about evolving the development process to make it easy to support frequent releases of new capabilities.```
                

```From a technical perspective the team will have to learn development practices like versioning services, rearchitecture through abstraction, feature flags, and evolutionary database design techniques.```
                

```Before applying DevOps principles at scale it is important for executives to ensure they are working from a solid foundation and that they understand the fundamentals currently in place in their organization, or else they will needlessly struggle to transform their development processes.```
                

```The first fundamental is clean architectures that enable smaller teams to work independently in an enterprise and make it possible to find defects with fast running unit or subsystem tests. The second is build and the ability to manage different artifacts as independent components. The third is test automation.```
                

```Applying DevOps and Agile principles at scale requires lots of automated testing. Expect to create, architect, and maintain at least as much test code and automation scripts as you create production code. Soundly architected test code leads to soundly architected production code that is easy to understand and maintain. If done well, this is a key enabler. If done wrong, it can turn into a maintenance nightmare that will cause a lot of problems, and the tests will not quickly localize coding issues.```
                

```The architectural challenge is to isolate the product variation so as much of the code as possible can be leveraged unchanged across the product line.```
                

```The next step in creating a solid foundation is to validate that the build process will enable you to manage different parts of your architecture independently.```
                

```A large amount of test automation is necessary when changing the development processes for large, traditional organizations. Without a solid foundation here, your feedback loops are going to be broken and there won’t be an effective method for determining when to promote code forward in your pipeline.```
                

```Writing good test automation is even more difficult than writing good code because it requires strong coding skills plus a devious mind to think about how to break the code.```
                

```A big problem with most organizations is that they delegate test automation task to the quality assurance (QA) organization and ask their manual testers to learn to automate what they have been doing manually for years. Some organizations buy tools to automatically record what the manual testers are doing and just play it back as the automated testing, which is even worse.```
                

```The problem with record and playback is that as soon as something on the UI or display changes, tests begin to fail and you have to determine if it is a code defect or a test defect.```                


```The other approach of having manual testers writing automated tests is a little better, but it has a tendency to result in brittle tests that deliver very long scripts that just replicate the manual testing process. This works fine for a reasonable number of tests when the software is not changing much. The problem, as we will demonstrate in the example below, comes when the software starts to change and you have thousands of tests. Then the upkeep of these tests turns into a maintenance nightmare.```
                

```The best approach for automated testing is to pair a really good development architect that knows the fundamentals of object-oriented programing with a QA engineer that knows how code is manually tested in the current environment.```
                

```A good example can be found in the book Cucumber & Cheese: A Tester’s Workshop by Jeff Morgan.```
                

```Executives need to understand the basic challenges of their current architecture and work to improve it over time. The build process needs to support managing different artifacts in the system as independent entities. Additionally, a solid, maintainable test automation framework needs to be in place so developers can trust the ability to quickly localize defects in their code when it fails.```
                

```Scott W. Ambler and Pramod J. Sadalage called Refactoring Databases: Evolutionary Database Design.```
                

```The objective is to leverage, as much as is possible, a well-architected set of common scripts across different stages in the deployment pipeline from Development to Production.```
                

```The other key principle to include as part of the scripted deployment process is creating post-deployment validation tests to ensure the deployment was successful on a server-by-server basis.```
                

```Determining if the organization will embrace these cultural changes up front is important because if they won’t, there is no sense in making big investments in technical solutions that on their own won’t help.```
                

```The important point is to let the pain of increasing the frequency on this production-like environment drive the priority of your technical changes.```
                

```Ideally the entire system would be fully deployed and tested with every new commit to quickly localize any system issues immediately down to an individual.```
                

```For very large organizations, virtualization should be considered for interfaces across significant organizational boundaries to help localize the ownership of issues.```
                

```The next big step for them in applying Agile and DevOps principles at scale is just creating a prioritized backlog.```
                

```Running a subset of tests that fully exercise this interface in the entire system, ideally on a daily basis, has the advantage of ensuring there are no disconnects between the virtual service and the actual code.```
                

```when the management team wants a new capability really badly, it tends to get it that way in terms of quality.```
                

```If executives can’t drive these cultural shifts in the release process, then they shouldn’t bother investing in technical solutions like CD because they won’t work.```
                

```The biggest thing missing in the industry is engaged executives who are willing to lead the journey and drive the cultural changes.```

