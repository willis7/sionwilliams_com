+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2018-05-14T20:46:13+01:00"
menu = ""
tags = ["dev", "howto"]
title = "Bulk find and copy in Bash"
+++

I needed to move a bunch of files from an old blog to the new one for conversion. Here's how:

``` bash
find . -name \*.asciidoc -exec cp {} /home/sionwilliams_com/site/content/post  \;
```

From the current directory it searched for files ending `.asciidoc` and moved them to the new location.

Once in the new location I was able to change the extension of the files with:

``` bash
for f in *.asciidoc; do mv -- "$f" "${f%.asciidoc}.md"; done
```