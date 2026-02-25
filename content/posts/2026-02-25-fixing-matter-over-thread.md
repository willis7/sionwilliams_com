---
title: "Fixing Home Assistant Matter-over-Thread: A Troubleshooting Deep Dive"
date: 2026-02-25T20:17:26Z
draft: false
toc: false
images:
tags:
  - homelab
  - matter
  - thread
---

Over the course of a few weeks, I’ve been locked in a deeply frustrating battle with my Home Assistant Thread network. What started as a simple desire to improve the signal strength of my setup quickly spiralled into a complete teardown of my smart home infrastructure. 

If you’ve ever found yourself staring at an obscure “check that your device can work with this network type” error while trying to commission a Matter device, this post is for you. Here’s how I accidentally destroyed my Thread network - and exactly how I fixed it.

## The Problem: Chasing a Better Signal

My original setup was a SkyConnect flashed with the Thread firmware. It worked flawlessly, and I had successfully connected a bunch of IKEA Matter-over-Thread devices without issue. However, I noticed one of my lamps occasionally dropping off the network. Assuming it was a weak signal, I decided to swap the SkyConnect for a [Sonoff Dongle Max](https://amzn.to/46visZA), hoping its larger antenna would provide better coverage. 

In doing so, I accidentally destroyed my Thread network.

Thinking the Dongle Max was the issue I eventually moved to a ZBT2 dongle to try and stabilise things, the situation didn't improve. My Android phone could see my preferred Thread network (`ha-thread-857B`), but every time I tried to add a device, it failed with a generic, useless error message.

I followed countless online tutorials. I cleared the cache and data in Google Play Services (and got caught out at the postoffice where it had cleared my wallet). I synced and re-synced Thread credentials. Nothing worked.

## Digging into the Logs

To fix this, I needed to stop guessing and start proving what was actually failing. The architecture of a Matter-over-Thread setup involves three key components that have to play nicely together:
1. **The Android Commissioner:** Google Play Services handles the credentials and the initial handover.
2. **The OpenThread Border Router (OTBR):** Running on Home Assistant, this bridges the 802.15.4 Thread mesh to your Wi-Fi network.
3. **The Local Network (UniFi in my case):** Handles the IPv6 and mDNS routing required for Matter.

To pinpoint the issue, I set OTBR log level to info so that I could see more granular logging. 

The result? Absolute silence.

The device wasn't even attempting to join the Thread mesh. However, my OTBR logs revealed two critical errors immediately after the router claimed to become a leader:

```text
00:00:36.922 [W] DuaManager----: Failed to perform next registration: NotFound
00:00:36.922 [W] DuaManager----: Failed to perform next registration: NotFound
```

This specific `DuaManager` error meant the `wpan0` (Thread) interface on the host OS had lost sync with the OTBR container after my multiple dongle changes. The backbone routing was broken.

## The Fix

Solving this required a three-pronged approach to fix the border router, unblock the network, and clear the bad device state.

### 1. The Cold Boot
Restarting Home Assistant wasn't enough to fix the corrupted `wpan0` mapping. I had to perform a full cold boot:
- Shut down the Home Assistant host completely.
- Unplug the ZBT2 dongle.
- Boot the host back up.
- Plug the dongle back in.

This successfully forced the OS to remap the interface. The `DuaManager` errors vanished, and OTBR correctly established its backbone routing.

### 2. The UniFi Multicast Trap
Even with a healthy border router, commissioning still failed. The culprit was buried deep in my UniFi Wi-Fi settings. 

Under the **Hi-Capacity Tuning** section of my SSID, I had **Multicast to Unicast** enabled. Matter relies heavily on mDNS (multicast DNS) for the Android phone to discover the Home Assistant border router *before* it hands over the Thread credentials. By converting multicast to unicast, UniFi was silently breaking the discovery phase. 

Unchecking this single box immediately allowed my phone to see the border router. My logs finally showed the `Commissioner` session starting.

### 3. The Nuke and Pave
Despite the phone and border router finally talking, the IKEA lamp still refused to join. 

Because the lamp had endured dozens of failed pairing attempts while the network was broken, its internal state was completely stuck. I had to perform a hard factory reset on the device itself (six quick power toggles for the IKEA bulb) to wipe the slate clean.

## The Outcome

With the border router routing, UniFi allowing multicast traffic, and the device factory reset, I attempted commissioning one last time. It connected instantly.

**Takeaway:** Troubleshooting smart home protocols like Matter and Thread can feel like black magic. The errors are often generic, and the failure points are spread across disparate systems (Android, Home Assistant, and your router). If you find yourself in a similar situation, stop guessing. Use your logs, check your multicast settings, and never underestimate the power of a true factory reset.
