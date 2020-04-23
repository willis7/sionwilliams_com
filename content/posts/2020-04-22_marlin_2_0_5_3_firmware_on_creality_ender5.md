---
title: "Marlin 2.0.5.3 firmware on Creality Ender 5"
date: 2020-04-22T11:33:54+01:00
draft: false
toc: true
tags:
  - 3dprinting
  - arduino
  - creality
  - ender 5
---
{{< figure src="/img/marlin-250.png">}}

I don't know if it's the lack of sleep ( I have a newborn in the house) or if this genuinely was a tough project, but I finally got everything working after five evenings of hacking.

## But didn't you have firmware installed?
Yes, I had the TH3D firmware installed, but I had a huge problem; My prints were off-centre and printing half size in the Z-axis. It transpires that the lead screw was changed on newer Ender 5's and the firmware I had, didn't support that.

> In mid-to-late 2019, Creality upgraded the base Ender-5 leadscrew to the same one used on the Ender-5 Pro which prevents the bed from dropping once power is cut.
> https://github.com/MarlinFirmware/Configurations/tree/import-2.0.x/config/examples/Creality/Ender-5

## Borked firmware
As someone who works in software development, I had a keen interest in the Marlin software, so I thought, rather than use someone else's code I would compile my own. This turned out to be a harrowing ordeal...

Having compiled all my changes in version 2.4.4 of Marlin, I flashed the firmware to my Ender 5. It was only when I booted the printer to start a test print that I noticed the screen was completely blank. My intuition told me I had fudged something, so I tried to flash the board again. No change.

## New bootloader
I had a gut feeling that the bootloader was probably the root cause, so I set out on a path to install a new bootloader. The problem was that my USBISP (that came with the BLTouch) wasn't recognised on OSX and I didn't have an Arduino Uno (which unfortunately is the only device 99.9% of YouTubers use in their videos). 

After hours of searching (during the early hours while my son wouldn't go back to sleep) I stumbled on this very poorly recorded video that was absolute gold. Here it is:

{{< youtube 4czctrIWafc >}}

I had an Arduino Mega1248 from years ago... and it worked!

> Again, during my early hour searches I found the following link. I wish I found this earlier:
[fwi_marlin_20_on_creality_115_silent_board](https://www.reddit.com/r/ender3/comments/ehfprd/fwi_marlin_20_on_creality_115_silent_board/)

## Operation "bull in a fridge" and the false success
For those of you who have tinkered with Marlin 2.0 you will know that getting it to fit on your Creality board with all the features you need is like trying to squeeze a bull into a fridge. When I added BLTouch, Auto Bed Levelling, Z safe homing and Slim LCD, I kept blowing the available capacity. I would get messages like this: 
```
Error: The program size (130774 bytes) is greater than maximum allowed (130048 bytes)
RAM:   [===       ]  29.2% (used 4792 bytes from 16384 bytes)
*** [checkprogsize] Explicit exit, status 1
Flash: [==========]  100.6% (used 130774 bytes from 130048 bytes)
```
BTW, if you haven't seen that message format before then, you probably aren't using [Auto Build Marlin with VSCode](https://marlinfw.org/docs/basics/auto_build_marlin.html). If like me, you have spent an unreasonable amount of time messing about with Arduino IDE by installing U8Glib and finding Sanguino boards, then I highly recommend using this approach. The tool is built on PlatformIO, which handles all the libraries the project needs. There are 2 buttons; `build` and `upload`.

Finally, when I got a configuration that eventually fit, I uploaded it to the board and printed my first configuration cube. I have to be honest, the results were astonishing and made it all worthwhile. However, there was one big problem... I forgot to enable auto bed levelling...... fuck!


## Operation OctoPrint
I had this on my list as a task to do later, but with my unsuccessful attempts at building a hex file small enough to live on the Ender 5 I was forced to bring this forward so that I could disable the SD slot and save space. I found an old Raspberry Pi 3B and installed octoprint on it. The best instructions I found are provided below. Note, at the time of writing, some of the options were obsolete.

https://howchoo.com/g/y2rhnzm3odz/control-your-3d-printer-with-octoprint-and-raspberry-pi

## Marlin 2.0.5.3 Update gives "err: EEprom Version"

So, with the OctoPrint build complete and tested, all I had left to do was compile the firmware with all of my configurations. Once the SD option was disabled I think the complete build was about 87% of total capacity. However, when I flashed the firmware I was greeted with the message `err: EEprom Version`. As a Mac user I had a horrible time finding software that worked and allowed me to send GCode to my printer. In the end it was the terminal that won with the `screen` tool. 

> You can use `screen` for that. Open a terminal window and type `screen /dev/ttyUSB0 115200`. The general form is `screen serialdevice baudrate`. You will then see everything that the printer sends. Everything you type will be sent to the printer.
> 
> https://3dprinting.stackexchange.com/questions/3112/how-to-directly-send-g-code-to-printer-from-a-linux-terminal/3131#3131?newreg=2419934d6d7840639b066ccc7acfbca1

The only thing left to do was send an `M502` followed by an `M500` and everything worked perfectly. You can find the docs for these commands, [here](https://marlinfw.org/docs/gcode/M502.html).


So that concludes my journey of running Marlin 2 on the Ender 5.