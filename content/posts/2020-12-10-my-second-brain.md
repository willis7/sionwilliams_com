---
title: "My Second Brain"
date: 2020-12-10T09:27:20Z
draft: false
toc: false
images:
tags:
   - pkm
   - foam
   - logseq
   - notion
   - pocket
---

> Some might argue I don't have one, let alone two.

I read lots of material, but I have a terrible time recalling all the great things I read. I've been yearning to find a system that helps me absorb more information while also organising it. I have spent most of 2020 trying to build that system, and I think I have reached a system that works for me, finally. My knowledge workflow has evolved significantly over the past 12 months, and the timeline below is the story of that evolution.

## Kindle Highlights
I've owned a Kindle for as long as I can remember. The highlights and notes feature is the most used features on my device. However, with the latest iterations (Paperwhite and Oasis), Amazon has stopped you extracting the notes from the device. Previously, you used to be able to connect a USB and pull the `MyClippings.txt` file off the device, which was a human-readable list of highlights on the device. Amazon does allow you to see your notes via the web interface, but it comes with a catch. It only shows highlights and notes from books purchased from Amazon. If like me you use the send to kindle utility, then you're out of luck. I have considered Jailbreaking my Kindle, but I'm not brave enough for that, yet.

> Fun fact; I wrote a little web app in Go about five years ago to parse my clippings and display them on a carousel via a web app.
https://github.com/willis7/Alice

## Pearltrees
> https://www.pearltrees.com/

This was a web service which showed real promise, and I think I found it back in 2009, maybe earlier judging by the content I stored on there... Ultimately it was a bookmarking tool for websites that used a graph representation which allowed you to categorise websites. Once you look past the pretty UI, you quickly realise it lacks some smart features. I don't use it anymore because the next item in the list does it better.

## Pocket
> https://app.getpocket.com/

This is branded as a "read later" app. If someone sends you a link, you can add it to Pocket and read it when you get time. However, with the highlighting (paid) and tagging features, I found this became my main source for recalling various articles I've read over time. Pocket is still a workhorse for me, but it lacks a few quality of life features. For example, I cant filter using multiple tags, and I'm only allowed to use one; devops or tools but not both.

## One Note
> https://www.onenote.com/

Making notes and highlights is fairly useless if you don't revisit them. In mid-2020, I added One Note to my workflow. One Note became my second brain. After reading a blog or book, I would re-read my notes and add the useful ones to One Note in my own words. I would put a reference back to the source and store it in a category in One Note. At first, this was great, but as the number of notes grew, I really struggled to link topics and ideas. One Note didn't have a method for doing this.

## Zettelkasten
While on my quest to build a better system or second brain as I have now learned it's called, one word kept popping up time and time again; [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten). This was the breakthrough. This was the methodology I didn't know I needed. I will leave you to explore Wikipedia for the full breakdown of the method, but the one thing you should take away from the article is that it's a system for linking similar topics together.

## Roam Research
> A note-taking tool for networked thought.
> As easy to use as a document. As powerful as a graph database. Roam helps you organize your research for the long haul.

After exploring the Zettelkasten method, I found lots of bloggers, academics and YouTubers raving about [Roam Research](https://roamresearch.com/). Roam had a cult-like following on youtube, and it was interesting to see all the various ways people structured their second brain. On the surface, Roam is extremely simple; it's a web-based word processor which allows backlinking to other topics. Let's say I added a page which recorded everything important from the day. The page would look like a journal entry, but it would be full of backlinks (picture a web link in a document) to articles I read and reviewed. Over time these backlinks build a network of linked ideas and topics. Roam was amazing and I spent a lot of time moving all my notes from One Note to Roam, however, I naively forgot to look at the cost. Boom, $165 a year.... see ya later, Roam.

## Foam Research
I love the open-source community!

> Foam is a personal knowledge management and sharing system inspired by Roam Research, built on Visual Studio Code and GitHub.

[Foam research](https://foambubble.github.io/foam/) combined all the things I love; Git, VS Code, Markdown and Roam Research, and best of all, it was free. Now, don't get me wrong the UI is nowhere near as sleek as Roam. The backlinking is clunky, and the graph diagram is a work in progress. But, I now have a complete system. I have a central repository to store all the things I learn from the various sources and I have a way to link the ideas and thoughts together. For those wondering, I was able to export all my Roam notes as Markdown, and then with minimal effort, I was able to use them in the correct Foam format.

Below is an extract from one of my literature notes pages. I typically backlink the title, the author and the hashtag Literature Notes. Now when I find other articles that explore the topic of Technical Leadership I can simply backlink them and further build my graph. Also, because I have backlinked Literature Notes, I now have a list of Literature notes I can read through from time to time.

``` markdown
- Ref: [[Becoming a Technical Leader]] [[Gerald Weinberg]] #[[Literature Notes]] 
- Idea
    - Leadership is a skill and as with any skill it can be learned.
    - Leadership is not an instinct.
    - Leadership is the process of creating an environment in which people become empowered.
    - Organic leadership leads to the process, not the people.
    - An environment must have __MOI__:
        - Motivation - why.
        - Organisation - to move ideas to practice.
        - Ideas or Innovation - seeds, vision.
    - Motivational leadership is just one type of leadership.
    - Technical leaders emphasise innovation. A problem-solving leadership style consist on:
        - Understanding the problem.
        - Manage flow of ideas.
        - Maintain quality.
    - All problem-solving leadership leaders have faith that there is always a better way.
    - Manager != Leader. Manager is an appointed leader.
    - Best working groups, leadership comes from everybody.
    - The paradox of the appointed leader:
        - We think the appointed leader is the essential part of an organisation, so
        - When there is trouble, everybody turns to the appointed leader, so
        - This increases the load on her, so she either:
            - Breaks, or
            - If she does not break, she has been the most active during the crisis, so
        - The paradox if reinforced, as she is seen as the essential part during the crisis.
        - This is why appointed leaders are replaced when a team does not perform. This is a fallacy. Systems are not linear.
    - Will I lose my technical skills if I become a leader?
        - Yes.

```

If like me you have years of disorganised notes that need a bit of TLC, I can highly recommend using Roam if you can afford it or Foam if you don't mind putting in a little extra work.