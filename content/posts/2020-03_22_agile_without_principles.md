---
title: "Agile without engineering principles"
date: 2020-03-22T10:02:44Z
draft: false
toc: true
images:
tags:
  - engineering
  - culture
---

## Introduction
There's a great buzz with my client at the moment, and I think it's because they're finally taking Agile seriously. Operating models are being pulled together with Agile at the core, and workshops are underway to ensure our processes are lean but effective. This is wonderful, but I'm here to say that implementing Agile without a focus on engineering principles is like rearranging deck chairs on the Titanic. 

When companies adopt Agile, the debate always ends up being one of Kanban or Scrum.  There's one big problem in that for me; they're both variations of workflow management (or project management), and neither offers any guidance on the engineering principles we should adopt. Extreme Programming did a little better because it was explicit about engineering practices. XP suggests teams should sit together, testing is at its core (TDD), as is pair-programming, along with continuous integration and many other capabilities. I echo many of these capabilities in the DevOps capability map.

Below I have shared some things you should consider when adopting Agile.

## Inverted test pyramid
{{< image src="/img/inv_test_pyramid.png" alt="inverted test pyramid" position="center" style="border-radius: 8px;" >}}

If your test pyramid looks like the image above, then you can guarantee your next bottleneck will be QA (if it isn't already). As developers complete their features in rapid succession, if there's inadequate coverage at the lower levels of the pyramid, then all you are doing is pushing the risk downstream. In an Agile setup, you would expect QA to validate the acceptance criteria is met, then move on to the next issue. If you have no automated low-level tests, then you will not have verified the functional behaviour in a repeatable way and are left having to do it manually, or worse, skip it. This ultimately results in a high work in progress (WIP) count for QA, and a development team is piling up more change behind. Kanban helps a little by limiting WIP, but it does not solve the "shift right" testing issue.

## Peer Review
Pair programming isn't for everyone. I like to put my headphones on and get in the flow - that works for me. The main driver for pair programming was not to solve problems faster (two brains and four eyes are better than one brain and two eyes), but rather to ensure no single person became a critical point of failure. Peer review has many benefits; it solves the two brains problem, can act as a change management process when backed by technology, and it's a way of knowledge sharing. Make this a part of your workflow combined with pair programming when it makes sense and you will shorten the feedback cycles and improve quality.

## Test-Driven Development
Wait?! Two points on testing? *Yes*. 
Agile teams favour iteration over lengthy solution design documents to arrive at the correct solution. This works well when you have changing requirements or early assumptions that prove to be incorrect. However, this lack of detailed design can lead to junior developers writing poorly designed code. The side effect of this is code that is hard to change and extend. TDD is proven to improve system design because code that is easy to test happens to have the same qualities of well-architected systems; they're easy to maintain and change. I often find that people new to TDD absolutely hate it, but once they have delivered a few features using it, they often question how they ever did it any other way. Not convinced with the benefits of TDD, read this:

## Continuous Integration
If you spend more than 30 minutes merging and running your tests, then you're doing it wrong... and 30 minutes is conservative! Continuous integration is the process of regularly merging your code with the main line of code and validating functionality by running all of your tests at the same time. Continuous integration is often confused with a continuous build, but it's worth noting they are not the same. You are not doing continuous integration just because you run your tests when you commit code.

Dont believe me? Listen to the master (from 9 mins)
{{< youtube aoMfbgF2D_4 >}}

## Standards
Standards carry a negative undertone because they're seen to be restrictive. However, standards take away some of the cognitive load of ensuring we all do things in the same way. In most cases, standards are automated and should form part of the delivery pipeline, therefore, minimising the burden to the developer. Many of the tools in circulation today help minimise bugs in code by encouraging best practice. Embrace standards, don't fight them.

That was a whistlestop tour of some foundations you should have embedded to make the Agile adoption more fruitful.
