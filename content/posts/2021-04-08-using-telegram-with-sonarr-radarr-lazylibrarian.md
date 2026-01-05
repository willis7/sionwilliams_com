---
title: "Using Telegram With Sonarr, Radarr and Lazylibrarian"
date: 2021-04-08T08:13:28+01:00
draft: false
toc: true
images:
tags:
   - homelab
   - telegram
   - howto
---

# Problem
I want to receive notifications when a download has started or completed.

# Solution
Pre-requisites
* Telegram installed
* Sonarr installed
* Radarr installed
* Lazy Librarian installed

## Telegram setup
1. Let's create a new bot. Start a chat with `@botfather` and type `/newbot`. You will get a bit of assistance through this process, so follow along.
2. _"Alright, a new bot. How are we going to call it? Please choose a name for your bot."_ I replied `Auto Pirate`. This is the name that will show up when you get sent a message.
3. _"Good. Now let's choose a username for your bot. It must end in `bot`. Like this, for example: TetrisBot or tetris_bot."_ I replied `my_auto_pirate_bot`. Note, this needs to be globally unique. Take a note of the long string under "HTTP API:".
4. Now, start a chat with `@myidbot` and type `/start` followed by `/getid`. Make a note of the reply.
5. Start a conversation with `@my_auto_pirate_bot` and type `/start`. Your bot is up and running.

Now that you have the user ID and the API token, you can start updating the tools.

## Sonarr and Radarr
1. Settings -> Connect -> Add connection -> Telegram
2. Fill in the blanks as per the screenshot below.
{{< figure src="/img/radarr_bot.png" alt="snippet of radarr config" width="75%" height="75%">}}

## Lazy Librarian
1. Config -> Notification -> Check "Enable Telegram"
2. Fill in the blanks as per the screenshot below.
{{< figure src="/img/ll_bot.png" alt="snippet of lazylibrarian config" width="75%" height="75%">}}