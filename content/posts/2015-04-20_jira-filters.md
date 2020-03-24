---
title: "My favourite Jira filters"
date: 2015-04-20T10:02:44Z
draft: false
toc: true
images:
tags:
  - howto
  - jira
  - engineering
---
## Anything Assigned to Me Personally

This filter picks up any items that slip through the built in filter.

``` sql
assignee = currentUser() AND status != Closed ORDER BY Rank ASC
```

## Assignee Was!

Gives you a list of tickets you have beed an assignee on since the start of the month.

``` sql
assignee was currentUser() after startOfMonth()
```

## Recently Resolved

``` sql
project = <project_name> AND issuetype = Bug AND resolved >= -7d
```