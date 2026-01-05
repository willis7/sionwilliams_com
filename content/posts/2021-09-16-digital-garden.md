---
title: "Digital Garden"
date: 2021-09-16T09:20:32Z
draft: false
toc: true
images:
tags:
   - pkm
   - logseq
   - foam
   - goodnotes
   - raindrop
   - todoist
   - notion
---

## Introduction
As a student, I was highly disorganised. The most "digital" organisation means I had at the time was the bibliography tool in MS Word. However, ebooks and good quality digital publications weren't commonplace at that time, and I wasn't aware of concepts like Zettelkasten. So over the past 5 years, I have tried to perfect my [Digital Garden](https://maggieappleton.com/garden-history). My digital garden is essentially the place where I capture and process the content that I consume. Below is a list of the tools I use and why. If I have replaced something for something better, I have captured it here also.


Let's start with some of the qualities I look for in a tool:

1.  **Price** \- as an employed adult and someone who works in software, I greatly respect how much effort goes into developing software. For this reason, I don't always pick [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software). However, the price needs to be sensible. For me, ROAM is ridiculously expensive, and it falls foul of the following quality.
2.  **Private** \- don't be fooled at how valuable all your hard work is to vendors. If you are putting your data in someone else's hands, you must accept they will monetise it. Let's use an example; Github was a place to store your software code for free so long as you made it open source. Then, Microsoft bought them for a staggering _$7.5billion_. Low and behold, only three years later, they are releasing an [AI service that helps you code](https://copilot.github.com/) using all the data you have fed into their massive machine learning algorithm. So, most of my solutions stress keeping my information on my machines.
3.  **Maintained** \- whether I pay for the service or pick something free, I like to have a steady flow of new features.
4.  **Integrated** \- I like these tools to play nice with each other. I want to avoid manually copying and pasting wherever possible. Typically, I find that integrated services also provide suitable mechanisms to import and export my data, which is essential for moving between tools.

## Notetaking
{{< image src="/img/dg_onenote.png" alt="onenote screenshot" position="center" style="border-radius: 8px;" >}}

I use a few tools in this space; [MS OneNote](https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app) and [Apple Notes](https://apps.apple.com/us/app/notes/id1110145109). OneNote has become the place where I keep most of my technology snippets. Unfortunately, the code formatting on OneNote is terrible, but I'm not brave enough to move it yet, and it doesn't fit into any of the categories below. Recommendations welcomed! Apple Notes is only for passing thoughts or [fleeting notes](https://haikal.blog/my-zettelkasten-journey-understanding-the-differences-between-fleeting-notes-literature-notes-reference-notes-and-permanent-notes/). My Apple notes are often empty because I either promote them to my connected ideas or bin them.

Example of a fleeting note

> _Capabilities that most impact flow_

This likely doesn't mean anything to anyone other than myself. However, it's a cue for me to investigate further and connect it to other ideas.

## Complex Notetaking
{{< image src="/img/dg_goodnotes.PNG" alt="goodnotes screenshot" position="center" style="border-radius: 8px;" >}}

For more advanced notes like Architecture diagrams or meeting notes, I tend to use [Goodnotes](https://www.goodnotes.com/). I write my meeting notes in a journal style book and my architecture diagrams in a squared paper book within Goodnotes. I don't typically promote my complex notes to connected ideas because they are often doodles or things that perish with time. There is a strong case for moving the architecture diagrams to Logseq, but I tend to use other technologies such as PlantUML. Text is pretty cheap to store in Logseq, but the repository can snowball if there are many images, so I don't typically store them here. With complex notes, I prefer the pen and paper feel to typing. This is partially due to my slow typing speed and the fact that annotating afterwards is far easier.

### What it replaced

I was a big user of [Notability](https://www.gingerlabs.com/) for a while but slowly transitioned to using Goodnotes to the point where I stopped using Notability. Notability is still a great tool, though.

## Connected Ideas
{{< image src="/img/dg_logseq.png" alt="logseq screenshot" position="center" style="border-radius: 8px;" >}}

[Logseq](https://logseq.com/blog/about) is the outright winner here. It matches all the qualities I highlighted earlier and is well polished. I have chosen to sponsor the project because it's really that good.

> **Logseq** is a _local-only_, _non-linear_, _outliner_ notebook for organising and [sharing](https://logseq.com/blog) your personal knowledge base.

For such a small team of developers, the product is fantastic. There's a desktop client, a web app, and it has version control through [Git](https://git-scm.com/), has a great UI and UX and is free.

### Good resources for Logseq

-   [OneStutteringMind YouTube](https://www.youtube.com/c/OneStutteringMind)

### What it replaced

[Notion](https://www.notion.so) was the first tool I used in this category. It was overpriced but the only one of its kind. However, [Foam Research](https://foambubble.github.io/foam/) quickly replaced that because it took privacy more seriously. Foam was a great replacement, but it wasn't a native application built for that purpose. Instead, Foam was a combination of plugins glued together on top of Visual Studio Code. It worked perfectly fine, but it wasn't such a great user experience. Moving from Foam to Logseq was reasonably painless because they both use the [Markdown format](https://www.markdownguide.org/basic-syntax/) for documents.

## Bookmarks
{{< image src="/img/dg_raindrop.png" alt="raindrop screenshot" position="center" style="border-radius: 8px;" >}}

[Raindrop](https://app.raindrop.io) is only a few days old, but it's working exceptionally well. Thanks, [Shu Omi](https://www.youtube.com/user/shu12081995), for the recommendation. I'm still learning how to use it, but I have paid for the pro subscription, and it immediately highlighted 80 broken links. The small details matter here, and it's part of the reason I switched from Pocket. I hate to admit I spent way too long putting icons on my collections, but the icon search is the best I've ever seen. I look forward to migrating the "Read" items into their respective "Collections"... not!

### What it replaced

Browser Bookmarks and Pocket. The Browser bookmarks are very primitive and don't follow you when you switch browsers. I keep a few for quick access. Pocket has been my go-to for the past 3years, and since I paid for the pro feature last year, there's been nothing I can say that made me feel like that was money well spent. Other than a slight UI change, there's been no measurable improvement. I still can't filter on multiple tags, for example.

## Todo
{{< image src="/img/dg_todoist.png" alt="todoist screenshot" position="center" style="border-radius: 8px;" >}}

This is the last one on my list and arguably not a Digital Garden component. The winner is [Todoist](https://todoist.com). Simple is best, but I do miss writing comments against some of the tasks like I could with Wunderlist and Trello. The features I like most are the Inbox, Today and Upcoming containers - it helps me park things until they need to be done, and the keyboard shortcuts are excellent. The projects section has also implemented a Trello style board which is also quite neat.

### What it replaced

[Trello](https://trello.com) was a favourite pick in this space until Atlassian bought them out. Having not taken too well to what they did with their Jira product by forcing their customers to the cloud, I decided to ditch Trello. [Wunderlist](https://en.wikipedia.org/wiki/Wunderlist) came next, but it was discontinued when Microsoft bought them out. The original author moved over and started to build the alternative, but it was missing all the features I liked in Wunderlist, so I switched to Todoist and have been with it since.
