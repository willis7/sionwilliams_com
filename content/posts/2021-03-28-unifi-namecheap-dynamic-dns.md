---
title: "Unifi, Namecheap and Dynamic Dns"
date: 2021-03-28T20:26:54+01:00
draft: false
tags:
   - homelab
   - unifi
   - namecheap
   - howto
---

## I. SETUP on NAMECHEAP WEBSITE:
A) Login to the the namecheap website and select MANAGE for your domain

B) Click on "Advance DNS" tab

C) Create a new host record using 4 pieces of info:

    type = A + Dynamic DNS Record
    host= * (this is the public name you want to access your device with. I'm using wildcard)
    value= 127.0.0.1 (this can be any IP as it will change once the gateway registers with Namecheap)
    Leave TTL the default value
D) Save the record

E) Scoll down to the Dynamic DNS section and flip the switch to turn it on.

F) it will produce a password in the "Dynamic DNS Password" field. Highlight and COPY this password. You will need it to setup your UDM pro.

## II. SETUP your Unifi OS
G) Login to UniFi controller and select the site where the gateway is located that is connected to your service provider.

H) Go to the Settings page and select "Services"

I) Select the "Dynamic DNS" tab and click the "+ CREATE NEW DYNAMIC DNS" button and enter the following data for each field:

    Interface= WAN1
    Service= Namecheap
    Hostname= *
    Username= xyz123.com
    Password= (paste the password you copied from the Namecheap website from step F above)
    Server= (leave this blank)

## Additional notes

I want to use subdomains, and I dont know what they all are yet so I used a wildcard (denoted by *). If you only care about setting an IP to your domain then replace * with @. @ is shorthand for the root. 

Even though my syslog server showed the UDM had made an update to namecheap, I couldnt see the change. I tried a few times but the service wouldnt update the IP. However, while taking a break I decided to update the firmware on the UDM. Either the elapsed time (approx 20 mins) took effect or the reboot made the difference. I used [dns checker](https://dnschecker.org/) to validate.

## Sources

On my journey a few useful posts were found. You can find the links below:

* https://www.namecheap.com/support/knowledgebase/article.aspx/595/11/how-do-i-enable-dynamic-dns-for-a-domain/
* https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns/
* https://community.ui.com/questions/USG-Pro-4-NameCheap-DDNS-Configuration/7a45b5c6-e2a4-49f9-b5a9-222262c781d0
