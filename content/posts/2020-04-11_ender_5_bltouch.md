---
title: "Upgrading an Ender 5 - Glass bed, Silent board and BLTouch"
date: 2020-04-11T13:54:26Z
draft: false
toc: true
images:
tags:
  - 3dprinting
  - arduino
  - creality
  - ender 5
---
## tl;dr
I discuss how I installed a glass bed, silent board (v.1.1.5) and BLTouch. This is mostly a record of the resources I found useful at the time of the project.

## Glass bed
After reading a few Reddit threads, I struggled to find a conclusion on the best glass to use. Many people used pyrex style glass, and others used plain glass. I decided to use an old Ikea mirror that I had lying around, and in the first instance, I drew around the magnetic bed to get an idea of shape then cut the glass with a tile cutter. I read loads of articles that suggested you should use a proper glass cutter, but the tile cutter worked well. There were some jagged edges, but I was quickly able to tidy those up with a piece of sandpaper.

### Bed adhesion
I tried a few prints on the glass without any additives, but they almost all came loose. While I don't recall the exact source, I remember one chap suggesting they use a 4 to 1 mixture of water to PVA (the kids type). Having just received a craft set for my daughter to keep her entertained during this lockdown period, I felt like that was the best option for now. I've heard blue tape and hairspray are equally good, but I had neither at my house. I can say the PVA mix has been exceptional.

## Silent Board
{{< image src="/img/ender5_silent_board.png" alt="creality ender 5 silent board" position="center" style="border-radius: 8px;" >}}
I work from home, and my printer is in my office. While I hadn't had the printer for long, the noise coming from the motors was extremely annoying. I pair program quite a bit, and the whining from the steppers can be annoying for the person I'm pairing with. It doesn't bother me because I have noise-cancelling headphones, but I wanted to be sympathetic to my colleagues. To solve this, I opted to buy this [silent board](https://amzn.to/34wWwvD) from amazon. Its the TMC2208 driver that makes everything so quiet. I don't know why this isn't standard, but there we go.

Some additional features that I wanted include the preinstalled bootloader. Installing a bootloader is a real PITA, I did it a few years ago on my Anet A8 and decided I would avoid it this time. Time is money and buying a bootloader board is cheaper than my time. Thermal runaway is another must for me - why such a necessary safety feature isn't standard is beyond my comprehension. The board also comes with Marlin firmware, but unfortunately, for reasons you will see soon, it was not useful for me.

Installing the board was straight forward. You can follow the tutorial shown below for instructions.
{{< youtube 75H8Uuha0R8 >}}

## Firmware
The firmware that came with the silent board lasted about 30 seconds. Long enough to test an auto-home and validate the new silent driver, then I flashed it following the instructions below.
{{< youtube Cp3D_1vJpvM >}}

You will notice that is a BLTouch video - that's why the firmware on the silent board wasn't fit for purpose.

### 3D Printing Canada
For some reason, I wasn't able to get their [source code](https://github.com/3d-printing-canada/Ender-5-BL-Touch-Installation) working. The code compiled correctly, but the Z Offset would not move the bed no matter what I did. I have a suspicion that there's a setting in the configuration.h file that enables minus values for Z Offset that I needed to configure, but I didn't spot that until after I got something working.

> I wasn't able to get this code working, but that doesn't mean you shouldn't try it too. I'm reasonably confident with a bit more patience I could have solved the issue.

### TH3D
Once I got back to the drawing board, the firmware that came up most was the TH3D firmware. As a Mac OSX user, I found [their guide](https://www.th3dstudio.com/knowledgebase/arduino-ide-for-mac-os-x-setup-guide/) extremely helpful. Once this bit was done I pretty much just followed the tutorial in the following youtube video.
{{< youtube iAz47riSjLQ >}}

Note, when he talks about dialling in the Z Offset and using a test print, you can find STL's in bed levelling STL directory.

The link to the firmware is provided below, but note it may be out of date when you read this:
* https://www.th3dstudio.com/knowledgebase/th3d-unified-firmware-package/?seq_no=6

## BLTouch
{{< image src="/img/ender5_bltouch.png" alt="creality ender 5 silent board" position="center" style="border-radius: 8px;" >}}
You probably got some hints throughout this post that I was going to be installing a BLTouch. Having owned an Anet A8 where I used a screwdriver to tighten the bed every week, I told myself there was no way I was going through that with my new printer. I had braced myself for needing to purchase all the components separately, but thankfully there was [a kit on amazon](https://amzn.to/3cnp2Tj). You will notice that the link does not suggest you can use the Ender 5, but I can confirm it works. Again, the best resource here was the 3D Canada youtube video I highlighted above.

## Whats next?
Currently, TBD, but I think it's highly likely I will be getting linear rails next.