---
title: "Upgrading to a new Synology device and migrating disks"
date: 2020-04-23T23:05:28+01:00
draft: false
toc: false
images:
tags:
  - synology
  - nas
  - backblaze
---

{{< figure src="/img/synology_1019plus.jpeg" title="Synology DS1019+" width="50%" height="50%">}}

I have to admit, despite also backing up to Backblaze I was quite nervous about moving my data from one machine to another. However, moving disks from one Synology to another couldn't be more straightforward. 

I primarily use the disk station for backing up my various cloud providers (Dropbox etc.), photos of my kids, business documents, the odd docker container (pihole, primarily) and Plex. I have 2TB drives in Synology Hybrid Raid configuration, which is only at 21% capacity, but I would like to start organising my volumes more effectively. In the first instance, I would like a volume primarily for media and downloads. For a long time, I attached an external drive for this solution, but as I was already super impressed with the [DS218+](https://amzn.to/2xT4Eed), and a little glum with the coronavirus lockdown, I decided to upgrade to the [DS1019+](https://amzn.to/2x2MWV8). 

A word of caution. My upgrade was made easier by the fact both of my machines were in the plus (+) range. Your mileage may vary, but be sure to read the documentation:

[How to migrate between Synology NAS (DSM 6.0 and later)](https://www.synology.com/en-us/knowledgebase/DSM/tutorial/General_Setup/How_to_migrate_between_Synology_NAS_DSM_6_0_and_later#t2)

After the wizard was complete, I reassigned the fixed IP from my old device to the new one, and it was as if it was the same machine. Even the 2-factor authentication moved over. I did have to change the hostname too because even that moved over as well.
