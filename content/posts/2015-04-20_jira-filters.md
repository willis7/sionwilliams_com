+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-04-20T20:46:13+01:00"
menu = ""
tags = ["jira"]
title = "My favourite Jira filters"
+++

## Anything Assigned to Me Personally

This filter picks up any items that slip through the built in filter.

```
assignee = currentUser() AND status != Closed ORDER BY Rank ASC
```

## Assignee Was!

Gives you a list of tickets you have beed an assignee on since the start of the month.

```
assignee was currentUser() after startOfMonth()
```

## Recently Resolved

```
project = <project_name> AND issuetype = Bug AND resolved >= -7d
```