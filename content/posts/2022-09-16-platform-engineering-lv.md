---
title: "Platform Engineering at LV"
date: 2022-09-16T01:27:00+01:00
draft: false
toc: true
images:
tags:
   - platform
---

When I rejoined LV in 2108, LV was still an [ITIL](https://en.wikipedia.org/wiki/ITIL)-heavy organisation. As with most large companies, we had a team of build managers who worked with the various delivery teams to set up things like build automation, build scripting, and release packaging.

## Evolution #1 - DevOps Engineering
In 2018, DevOps and, more specifically, DevOps Engineering was all the rage. Recruiters weren't looking for Build Managers anymore, and it was important to me that my engineers stayed relevant. LV was going through the sale of the general insurance business at this time, and with it, we were about to lose more than half of our Unix and Networking staff. This was the perfect time to expand the role of Build Manager to include System Administration. The DevOps Engineer in LV was born.

The former Build Managers were a talented bunch, often involved in production incidents and debugging. The inclusion of System Administration was less an expansion of the role rather than a formal inclusion for better visibility and compensation.

Our team set-up largely stayed the same, with DevOps Engineers working with delivery teams in a decentralised way. While this was super productive,  we had the problem that each team solved the same problems slightly differently.

## Evolution #2 - Platform Engineering
I had just completed LV's Cloud Strategy. We were about to become a Cloud First organisation with Kubernetes front and centre. The problem at this point was that we didn't have a team ready to run the platform. In October 2021, I had a team meeting with the DevOps team and explained that the world was moving towards Platform Engineering. With the support of the excellent [Team Topologies](https://amzn.to/3UgFuvd) book, I explained that the new Platform Engineering team would become a centralised service provider for Cloud and Developer Experience. The Developer Experience side of things was well understood; the group would continue their DevOps activities but slightly change how they approach it. Rather than being decentralised, they would now come together as one team.

Here's the blog post I shared internally about this change:

> With the latest reorganisation, we have centralised the former DevOps, environment and capmon engineers into the newly formed Platform Engineering Team. A few years ago, I would have scoffed at the idea and insisted that we are at the coal face with the delivery teams. However, I have learned that this model doesn't scale well in LV (more projects than people), and worse, we now have technology sprawl, SME's (single points of success) and duplication. For example, we have 4 DB migrations tools, 3 build tools, various solutions for release note generation, various branch and merge strategies and multiple custom scripts solving the same problems.

> To resolve this problem, my team will focus on two areas; Cloud Platform Engineering and Developer Experience. The Cloud Platform Engineering Team will build and operate a modern platform for hosting applications in Azure. The Developer Experience team will focus on enabling Development and Data Science teams to produce high-quality software deliverables covering all areas of the SDLC.
> ### Engagement Model
> Engaging with the platform team will be a bit different moving forward, and it's going to be bumpy initially. As I alluded to earlier, we are going to move away from the decentralised model. In practice, this will mean a central backlog for the Platform team, and all requests will need to go via that route. There are many reasons for this; currently, business unit knowledge lives with a select few individuals rather than the whole team - this isn't great for business continuity. We need to ensure that if an S&R platform engineer goes on leave, the rest can cover. Secondly, we want to reduce duplication. At present, if a request for a DevOps pipeline is made in two projects, it's unlikely to be seen by the whole team, and even more likely, the problem will be solved in two different ways. Finally, it's a great way to visualise work in progress. For those familiar with lean methodologies, you will know limiting work in progress is key to increasing velocity. You can only apply WIP if you are clear on all the work you have.
> A word about bottlenecks: centralising a team doesn't come without its risks. We have all seen central teams make priority calls on what ticket to progress next, and in those scenarios, someone else loses. We are very mindful of this, and so we are planning on giving more responsibility back to the delivery teams. In most modern organisations, it's unheard of to see a team other than the development team implement the logic for each stage of a deployment pipeline, for example. Fear not, we will not leave you unsupported we will talk about the golden path in a moment :-)
> ### The Golden Path
> As I mentioned earlier in this article, there has been a lot of technology sprawl over the past few years. The Platform Team will develop a "Golden Path" that outlines standards and best practices for delivering software to combat this. In due course, we will recommend one pattern or standard for each capability (above) required to deliver software. In addition, we will provide thorough documentation, libraries and self-serve portals to ensure a great experience and easy onboarding.
> While we believe in the Golden Path, we understand that being prescriptive about how teams execute tasks can stifle innovation. So, we will encourage experimentation and innovation, and if we see an improvement to the Golden Path, we will update our standard to reflect. This is our continuous improvement guarantee.
> ### Knowledge Management
> >Any organisation that designs a system (defined broadly) will produce a design whose structure is a copy of the organisation's communication structure.— Melvin E. Conway

> To summarise, Conway's Law says that teams build stuff that reflects the organisation structure. You can see this everywhere in LV, from workflow management tools to the way we create sites in Sharepoint. Nowhere is this more obvious than Confluence. Don't believe me? Have a look at the spaces in Confluence. You will see a space per team since the introduction of Confluence in LV; Linux, Build, Database, CTO, etc. This is relatively common, but the effect is a lot of duplication. Because multiple teams may support various systems, you will often find nuggets of information in each space. We will do our bit to tidy up the information we are aware of and move it to a structure that ages better.

> Above is a brief introduction to some of the changes you can expect from us over the coming weeks and months. 

Centralising the team was an important point in this change. While we tried to share solutions across teams, it wasn't working well. We were still building different solutions to the same problems, creating a maintenance overhead. As a centralised team, we would pick the best solution and only support that one solution. We called this the Golden Path. Having a Golden Path solution also came with its challenges. We didn't want to stifle innovation by dictating everyone followed the Golden Path, so we handed a lot more control back to the individual delivery teams. If a team had an innovative idea that existed outside of the Golden Path, they were empowered to make the change. If the Platform Team felt it was a good change that would benefit the broader company, then it would be adopted by the Golden Path and supported by the Platform Team. If not, it would be the responsibility of the delivery team to maintain the solution in the future.

Asking the team to assume responsibility for Azure and Kubernetes platforms was a more difficult ask. Most of the team had little to no cloud experience, but they possessed an essential skill - they were great at solving problems. Shortly after the meeting, I pulled together a training plan, and with the support of myself and the cloud architect, we set off to design and build our Azure Enterprise Landing Zone and AKS Landing Zone. Both are as code, and both are a resounding success. I couldn't be more proud of the team.

## Conclusion
Evolving toward a Platform Engineering model has proven fruitful. We are much clearer on the work being carried out by the team, and we are seeing standardisation across projects. However, this hasn't been without its challenge. Changing organisations is hard, and when people have been told for so long that something isn't their responsibility, changing can prove challenging. This happened when we asked developers to take a more active role in the build management of their applications. While they still had the support of the platform engineering team, this led to a bit of discomfort.
