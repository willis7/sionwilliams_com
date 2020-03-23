+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2018-06-05T00:01:13+01:00"
menu = ""
tags = ["git"]
title = "Git reset last commit"
+++

Sometimes I get carried away with git and its high power features.

I was working between 2 repos and realised I had a change I hadn't saved and wanted to add to my last commit. This was my blog, of which im the only contributor, and so I made the save (resulting in an unstaged change) and run `git add . && git commit --amend --no-edit`. To those who dont know this command will stage all new changes and add them to the previous commit without making you edit the commit message. Nice, eh? It was at this point I realised I was in the wrong project and needed to revert the commit.

`git reset 'HEAD@{1}'`

The command above reverts me to the state I was in before my last action. For further details, take a look at this [great SO post](https://stackoverflow.com/questions/2510276/undoing-git-reset#2531803).