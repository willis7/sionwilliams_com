---
title: "Foam Research: Templates"
date: 2021-05-02T19:58:41+01:00
draft: false
toc: false
images:
tags:
  - foam research
---

As part of my [second brain](https://sionwilliams.com/posts/2020-12-10-my-second-brain/) workflow, I like to store complete copies of the sources I read. To make this easier, I created a template. Unfortunately, the Foam documentation isn't forthcoming on how to do this, but you can find it [here](https://github.com/foambubble/foam/blob/b1bdf766b17212964f4b8400db72d6e5dcafe6d4/docs/features/note-templates.md).

To create the template, use `Ctrl+Shift+P`, then type `Foam: Create New Template`. For my *resource* template, I used:

```markdown
# ${1:$TM_FILENAME_BASE}

Date accessed:${CURRENT_DATE}/${CURRENT_MONTH}/${CURRENT_YEAR}

${CLIPBOARD}
```
This is a straightforward template that adds a title that is derived from the filename, it auto-populates the current date and finally pastes the contents of the clipboard. I take the clipboard because I use the fantastic firefox plugin [MarkDownload - Markdown Web Clipper](https://github.com/deathau/markdown-clipper) by DeathAU. This plugin allows me to export whole pages as markdown (obviously, duh), which I can quickly dump into my newly created page.

Create a new note from the template with `Ctrl+Shift+P` and `Foam: Create New Note From Template`.
