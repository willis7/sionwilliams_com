+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-01-16T20:46:13+01:00"
menu = ""
tags = ["gradle", "plug-in", "intellij", "debugging"]
title = "Debugging Gradle Plugins in Intellij"
+++

Ok, so this one had me stumped for a while and the solution was extremely simple.

I read lots of information in the Gradle forums on this and it sent me in the wrong
direction. Loads of articles saying to set certain flags/GRADLE_OPTS, which isnt necessary.

So, in Intellij (im using version 14), set your breakpoint and from the Gradle Tool Window
in 'all tasks' area, right click the task and select the debug option from the context
menu.

Voila!

[Intellij docs](https://www.jetbrains.com/idea/help/working-with-gradle-tasks-in-gradle-tool-window.html)
