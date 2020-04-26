---
title: "Dont Blindly Upgrade Your 3d Printer"
date: 2020-04-26T10:31:20+01:00
draft: false
toc: false
images:
tags:
  - 3dprinting
  - arduino
  - creality
  - ender 5
---

So, I have to admit, I've been somewhat frustrated with my printer recently. If you have read any of my blogs, you will know that I've added a few upgrades from glass beds to silent boards. I've also printed upgrades like bed strain arms, power cable reliefs etc. However, it felt like no matter what I did, I could not get the first layer to adhere to the bed. I did notice that when prints failed they always did so on the right. In entirety, I think I have wasted about 25% of my current filament roll to a lack of adhesion.

Well, that all ended today when I found a new plugin for OctoPrint called [Auto Bed Levelling Visualiser](https://plugins.octoprint.org/plugins/bedlevelvisualizer/). This plugin offers a way to probe your bed and produce a chart of the results. This is the first image I generated:
{{< figure src="/img/bed_level_before.png" title="Bed level graph before">}}
Something stood out to me, and that was the right-hand side was much lower than the left. That's the dark blue you can see in the image. This corroborated what I was witnessing. Having assessed my printer, I noticed that the relief arm on that side had broken at the clamp. While this wasn't particularly significant, it did trigger a thought; I wonder if the arms are skewing the build plate. BTW, the arms that I'm referring to can be [found here](https://www.thingiverse.com/thing:3661405). I decided to remove the arms and run the bed visualiser for a second time.
{{< figure src="/img/bed_level_after.png" title="Bed level graph after" width="80%" height="80%">}}
As you can see, there is now more of the salmon colouring which signifies more areas are around the 0 value. A good sign that we're levelling out. The frontmost right corner is still dark blue (lower), but I think I can dial this in with the springs and let the BLTouch do the rest.

The valuable lesson that I learnt here is; don't blindly add upgrades to your printer. Use upgrades to solve problems that you have, don't just add them because they're on Thingyverse and for your printer.