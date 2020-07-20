---
title: "Jira ID in a Git commit message"
date: 2020-07-20T10:31:20+01:00
draft: false
toc: false
images:
tags:
  - git
  - jira
---

This is is the subject of many holy software wars. Hopefully I will convince you there's only 1 right answer.

## Option 1 : Jira ID & Terse description
example
```
SDP-1 set repo name to jira summary
```

## Option 2 : Terse description and Jira ID in body
example
```
set repo name to jira summary

SDP-1
```

## Winner is ..
Option 2. It has to be, right? When you work on the command line, characters are precious. Here's what my shorthand git log looks like:
```
$ git ll
69bc072 set repo name to jira summary                           (7 min..) <Sio..>
a1ebba3 Merge pull request #3 from Liverpool-Victoria/github-.. (25 ho..) <Sio..>
d9f4262 Create go.yml                                           (25 ho..) <Sio..>
6aac61b Merge pull request #2 from Liverpool-Victoria/refacto.. (26 ho..) <Sio..>
0d720fb Use an interface wrapper around the GitHub client       (26 ho..) <Sio..>
ef68e72 Merge branch 'refactor/structure-and-tests'             (8 day..) <Sio..>
e9181c2 Add cmd/server.go and app.go                            (8 day..) <Sio..>
1cebe33 add github client and create repo                       (9 day..) <Sio..>
38ae8ca Update README.md                                        (10 da..) <Sio..>
a5c282d initial commit                                          (10 da..) <Sio..>
```
Now here's the same with Option 1

```
$ git ll
69bc072 JIRAID-123 set repo name to jira summary                (7 min..) <Sio..>
a1ebba3 JIRAID-122 Merge pull request #3 from Liverpool-Victo.. (25 ho..) <Sio..>
d9f4262 JIRAID-121 Create go.yml                                (25 ho..) <Sio..>
6aac61b JIRAID-120 Merge pull request #2 from Liverpool-Victo.. (26 ho..) <Sio..>
0d720fb JIRAID-119 Use an interface wrapper around the GitHub.. (26 ho..) <Sio..>
ef68e72 JIRAID-118 Merge branch 'refactor/structure-and-tests.. (8 day..) <Sio..>
e9181c2 JIRAID-117 Add cmd/server.go and app.go                 (8 day..) <Sio..>
1cebe33 JIRAID-116 add github client and create repo            (9 day..) <Sio..>
38ae8ca JIRAID-115 Update README.md                             (10 da..) <Sio..>
a5c282d JIRAID-114 initial commit                               (10 da..) <Sio..>
```

Option 1 is consuming some precious context. Always remember that the commit message is the narrative of your code - if you cant make sense of it, then god help you if you need to debug a catastrophic bug in the early hours. In this contrived example it's not immediately obvious, but if you look at commit `0d720fb JIRAID-119 Use an interface wrapper around the GitHub.. (26 ho..) <Sio..>` you can see that we sacrifice some context (`client`) . By placing the Jira ID in the body of the commit message rather than the header, you can still query git for the ID, but it doesn't impose on the short form for `git log`.
```
$ git show 69bc072
commit 69bc0720275ce6a6d287e53a174c8c0d1ee87319 (HEAD -> feature/sdp-1-repo-creation, origin/feature/sdp-1-repo-creation)
Author: Sion Williams <sion5@hotmail.co.uk>
Date:   Mon Jul 20 21:02:19 2020 +0100

    set repo name to jira summary

    SDP-1

diff --git a/app.go b/app.go
index 7f93d03..b550cd8 100644
--- a/app.go
+++ b/app.go
```