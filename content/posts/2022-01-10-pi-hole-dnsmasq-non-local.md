---
title: "How to fix Ignoring query from non-local network in dnsmasq?"
date: 2022-01-10T18:34:30Z
draft: false
toc: false
images:
tags:
  - unifi
  - raspberry-pi
  - pi-hole
  - dnsmasq
---

After an evening of tinkering with pi-hole I woke up to the following warning in pi-hole. This manifested with non-main networks, such as IoT, Camera, and Guest failing to connect to the internet.

The setting that needs to change is in "settings" -> "DNS" -> "Interface Settings" -> toggle "Permit all origins". 

{{< figure src="/img/pi-hole-permit-all.png" alt="pi-hole options">}}

However, take care with this setting. There is a sufficient health warning with this setting:

> These options are dangerous on devices directly connected to the Internet such as cloud instances and are only safe if your Pi-hole is properly firewalled. In a typical at-home setup where your Pi-hole is located within your local network (and you have not forwarded port 53 in your router!) they are safe to use.

I'm able to turn this on in my setup because I have 2 firewall rules enabled:

* Allow DNS requests from local networks to Private LAN DNS servers (TCP + UDP)
* Block & log all requests to other DNS servers (port 53)

The first rule allows all of my networks to reach my pi-holes, and the second blocks the use of any other DNS services.
