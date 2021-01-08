---
title: "Agile without Engineering Practices"
date: 2021-01-08T00:35:59Z
draft: false
toc: false
---

When companies adopt Agile, the debate always ends up being one of Kanban or Scrum. There's one big problem in that for me; they're both variations of workflow management (or project management), and neither offers any guidance on the engineering principles we should adopt. Extreme Programming did a little better because it was explicit about engineering practices. XP suggests teams should sit together, testing is at its core (TDD), as is pair-programming, along with continuous integration and many other capabilities. I echo many of these capabilities in the DevOps capability map.

Below are some things you should consider when adopting Agile.

## Inverted test pyramid
{{< figure src="/img/inv_test_pyramid.png" alt="Image result for inverted test pyramid" width="50%" height="50%">}}


If your test pyramid looks like the image above, you can guarantee that your next bottleneck will be QA (if it isn't already). As developers complete their features in rapid succession, if there's inadequate coverage at the lower levels of the pyramid, all you are doing is pushing the risk downstream (shift right). In an Agile team, QA is there to verify the acceptance criteria, then move on to the next issue. If you have no automated low-level tests, you will not have verified the functional behaviour in a repeatable way and are left to do it manually, or worse, skip it. This ultimately results in a high work in progress (WIP) count for QA and a development team that continues to pile up change. Kanban helps a little by limiting WIP, but it does not solve the "shift right" testing issue.

## Peer Review
Pair programming isn't for everyone. I like to put my headphones on and get in the flow - that works for me. The main driver for pair programming was not to solve problems faster (two brains and four eyes are better than one brain and two eyes), but rather to ensure no single person became a critical point of failure. Peer review has many benefits; it solves the two brains problem, can act as a change management process when backed by technology, and it's a way of knowledge sharing. Make this a part of your workflow combined with pair programming to shorten the feedback cycles and improve quality.

## Test-Driven Development
{{< figure src="/img/TDDInsightspost_f57abdf33d2a1f4328e2c3c3fc8322cd.png" alt="Image result for TDD" width="50%" height="50%">}}

Wait?! Two points on testing? _Yes_. 

Agile teams favour iteration over lengthy solution design documents to arrive at the correct solution. This works well when you have changing requirements or early assumptions that prove to be incorrect. However, this lack of detailed design can lead to junior developers writing poorly designed code. The side effect of this is code that is hard to change and extend. TDD is proven to improve system design because code that is easy to test happens to have the same qualities of well-architected systems; they're easy to maintain and change. I often find that people new to TDD absolutely hate it, but once they have delivered a few features using it, they often question how they ever did it any other way. Not convinced with the benefits of TDD, read this:: https://arxiv.org/ftp/arxiv/papers/1711/1711.05082.pdf

## Continuous Integration
If you spend more than 30 minutes merging and running your tests, then you're doing it wrong... and 30 minutes is conservative! Continuous integration is the process of regularly merging your code with the main line of code and validating functionality by running all of your tests simultaneously. Continuous integration is often confused with a continuous build, but it's worth noting they are not the same. You are not doing continuous integration just because you run your tests when you commit code.

Watch this video from 9;33 for the proof;

{{< youtube id="aoMfbgF2D_4" title="Martin Fowler - Continuous Delivery" >}}



## Standards
Standards carry a negative undertone because they're seen to be restrictive. However, standards take away some of the cognitive load of ensuring we all do things in the same way. In most cases, standards are automated and should form part of the delivery pipeline, minimising the burden to the developer. Many of the tools in circulation today help minimise bugs in code by encouraging best practice. Embrace standards, don't fight them.



That was a whistle-stop tour of some foundations you should have embedded to make the Agile adoption more fruitful.