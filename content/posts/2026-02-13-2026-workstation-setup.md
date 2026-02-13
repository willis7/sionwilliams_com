---
title: "My 2026 Workstation Setup"
date: 2026-02-13T11:50:34Z
draft: false
toc: false
images:
tags:
  - untagged
---

I thought it would be fun to capture my daily driving environment for the year 2026. I have made a few changes during the first 2 months of 2026 and I thought this would be a fun way to track that evolution over time.

## Hardware

As of today I am working on a Macbook Pro M2 with 16GB of RAM running Tahoe. I have owned this device for 3 years and it's still as strong as the first day I got it. I did wipe it in November which has helped but I'm also more conscious about the apps that I run now to eek out a bit more performance (more on that later).

For peripherals I am using an older [Logitech MX Master 3](https://amzn.to/4cnbvgM) along with the [Logitech MX Keys X](https://amzn.to/4rgvpP2). I switched to the MX Keys X after my Keychron K8 became faulty. I have enjoyed the move back to silent keys more than I thought I would. As I primarily work remotely I decided to upgrade my audio to the [Jabra Speak 510](https://amzn.to/4kwayVk) so that I'm not stuck with headphones on all day while my laptop is docked. The camera I use is the [Logitech Brio 4k (old version)](https://amzn.to/3OpjcJj).

Finally, I am using [Samsung Odyssey G9 49"](https://amzn.to/4aif72c) ultra-wide monitor which was an early release model. This is really starting to show it's age with screen artifacts, but is fine for the odd game.

## Software

### IDE

I recently made the switch to [Zed](https://zed.dev/) from [Anigravity](https://antigravity.google/), and [VS Code](https://code.visualstudio.com/download) before that. The chromium based tools were real memory hogs, and over the years I had collected extensions that I was having to enable/disable by project just to keep performance at it's peak. Zed is minimal and to the point, which I appreciate after Antigravity kept trying to force agents down my neck. It's much closer to the notepad experience I wanted. I had considered a switch to NeoVim as I do a lot of work server side also, but I didn't have the energy to commit to learning it. I'm sure I would like it, but I need to save that for a time when other technologies are not vying for my attention.

### Terminal

I have long been a user of [iTerm2](https://iterm2.com/). I see from my dotfiles I added it about 3 years ago, but I know for certain I was using it for a few years prior to that. There hasn't been much innovation in that time, but then there hasn't needed to be either. That is until Warp started getting some hype with it's AI completions. Since then iTerm2 has also added AI features which I despise. However, about a month ago I switched to [Ghostty](https://ghostty.org/) during my quest to optimise my laptop. It runs with nearly 100MB less ram, but also feels significantly snappier. The switch also gave me time to learn the keybinds which has significantly improved my workflow. With it also working on Windows, this means my configuration which I manage with my dotfiles repo is portable, allowing me to configure all my machines the same way.

### Coding Agent

My journey here started much like everyone else. I started in the IDE and eventually migrated to the CLI (or TUI more specifically). Over the past 2 years my journey has gone; Copilot -> Claude Code -> Antigravity -> Claude Code -> [OpenCode](https://opencode.ai/). I'm really happy with OpenCode. I get the freedom to use whatever models I want from an endless list of providers. It has all the capabilities of Claude Code without the restrictions. Some feature tend to have a small delay such as Skills, Memory and so on, but I can live with that.

### Notetaking

This is an important part of my workflow. I take extensive notes both in my personal and work life. For this I have been using [Obsidian](https://obsidian.md/) since around 2022 after switching from [Logseq](https://logseq.com/). I absolutely love it. Keeping everything local in markdown is a huge win for me - I can use git for sync, and I can use AI without issue. However, Obsidian being an Electron app makes it high risk for swapping out. The Renderer consistently consumes ~900MB of memory which puts it in the number 1 "memory hog" position. If a more performant competitor emerges, this could be a quick and easy swap for me.

### Email & Calendar

I have many emails from many providers. I had tried outlook for a while but the ads were annoying and it never felt good on the Mac. As I operate both Windows and PC, much like my other choices I wanted something I could run on both. [Thunderbird](https://www.thunderbird.net/en-GB/) was the standout candidate, and while I'm not completely sold, it does tick all the boxes; unified email, cross platform (inc Android) and a clean interface with no ads. It could still be better. Emails sometimes fail to send and have to be retried, and the UI looks a bit dated.

### AI Augmentation

[AlterHQ](https://alterhq.com/) was my best find of 2025. What initially started out as an AI assisted meeting note taker, has quickly evolved into my most loved productivity tool. I suck at taking meeting notes; I always miss details, and recall suffers as a result. Back in 2024 I discovered [Bloks.app](https://www.bloks.app/) which would intercept your audio channels record audio and produce a transcript. It would then pump it through an LLM and produce clean meeting notes. This worked great until my early bird price ended and the price shot up. It was around this time I discovered Alter, but I wasn't just drawn to the Meeting Notes. For a one off fee of £750, I would also get access to an LLM API which gave me access to the latest models with a generous fair usage policy. This felt like a great deal because at the time I was paying £20 a month for just ChatGPT. Now I had access to all the frontier models for life. The team behind this tool is incredible - they release features every friday and they appear to get more impressive as time goes on. The latest update allows alter to run code in a completely sandboxed Apple VM. Note, that while this isn't as crazy as OpenClaw, it's not far off, but it has security as a first class citizen.

## Closing Thoughts

While I have a Windows PC and Macbook, I typically reserve my PC for gaming, and my Macbook for coding and work related tasks. You will see a pattern of optimising for performance with my choices. As my Macbook gets on in age, I feel this will give it some longevity and keep the experience snappy.
