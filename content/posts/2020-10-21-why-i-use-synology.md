---
title: "Why I Use Synology Diskstation"
date: 2020-10-21T19:23:46+01:00
draft: false
toc: false
images:
tags:
  - synology
  - nas
  - backblaze
---

As a Principal DevOps Engineer, it wouldn't be unreasonable for you to expect me to have built my home server/lab/NAS. I have done precisely this in the past. I immensely enjoyed sourcing all the parts I wanted, assembling them and then provisioning it using Ansible. The goal of that machine was to keep it as low power as possible, but still serving the my needs. To be honest, back then, that was pretty much just acting as a media server, and well before the demands of 4K. However, as a parent of two, and with very little free time - I have conceded to the idea that maybe a COTS product is OK. I have reached that time in my life where I just want to plug and play.

## QNAP vs Synology
{{< figure src="/img/ds218plus.jpg" link="https://www.amazon.co.uk/Synology-DS218-Bay-Desktop-Enclosure/dp/B075L82DP1/ref=as_li_ss_il?dchild=1&keywords=ds218+&qid=1603307909&sr=8-1&linkCode=li3&tag=rossinspi-21&linkId=a0618d71655ba963eec29b5c431ad99f&language=en_GB" width="50%" height="50%" caption="DS218+">}}
I have been a happy Synology user for the past 3 years. Unfortunately, back then I don't recall what led to me buying the Synology over the QNAP. Still, I do remember spending a lot of time deciding. The product I purchased back then was the [DS218+](https://amzn.to/3dPGsKq), a 2 bay device which was capable of running a few Docker services along with Plex Media Server. My primary usage was the Moment photo management tool, Plex and I run home assistant and Pihole on Docker. In terms of CPU and Memory usage, I never hit the maximum capacity, ever.

## Upgrading to a beast
{{< figure src="/img/synology_1019plus.jpeg" link="https://www.amazon.co.uk/Synology-DS1019-Bay-Desktop-Enclosure/dp/B07MBCK2WF/ref=as_li_ss_il?dchild=1&keywords=ds1019+&qid=1603306312&sr=8-1&linkCode=li2&tag=rossinspi-21&linkId=2678233fe3c7752026631c7320066f61&language=en_GB"  width="50%" height="50%" caption="DS1019+">}}
With only 4TB configured as Hybrid Raid, I was starting to max out the storage between my movies and photo consumption. At this point, I could have upgraded the drives, but I wasn't keen on the fact that I had such high redundancy for my movies. The photos, I never want to lose, but I could live with having to start my movie collection again. Let's be honest, at some point, I will want to move from 1080p to 4K. After some research, I decided that I wanted to get the 5 bay [DS1019+](https://amzn.to/3jgPwsz). This expanded nicely in all areas, and I had an old 8TB disk that would be perfect for my movies. Moving to the new device was a dream, and I was guided through the process by a friendly wizard. See, [here]({{< relref "2020-04-23_synology_migration.md" >}}). Since upgrading to the new machine, I have started to use it for more things. I now use the "Drive" application on all my devices which means I no longer need dropbox or iCloud. Another handy feature of the Synology is setting it up as a Syslog server. With this enabled, I have started streaming my Ubiquity network logs there for the record. Finally, as a paranoid father who wants to keep his photos forever, I did decide to set up an off-site storage solution in the form of [Backblaze](https://www.backblaze.com/cloud-backup.html#af9uze) too. Backblaze is amazingly cheap, and it was trivial to set this up in Synology. I simply used the cloud backup app, set a nightly schedule with a list of files and it did the rest.
If you are considering purchasing a Synology device, then I can highly recommend their product. It's excellent for tinker nerds like myself, but also highly usable out of the box.