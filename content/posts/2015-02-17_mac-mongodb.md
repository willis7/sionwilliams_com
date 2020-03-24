---
title: "Setup MongoDB on Mac Yosemite"
date: 2015-02-17T10:02:44Z
draft: false
toc: true
images:
tags:
  - howto
  - engineering
---

## Install MongoDB with Homebrew

```bash
$ brew install mongodb
$ mkdir -p /data/db
```
## Set permissions for the data directory
Ensure that user account running mongod has correct permissions for the directory:

```bash
$ sudo chmod 0755 /data/db
$ sudo chown $USER /data/db
```

## Run MongoDB!
`$ mongod`

---

**Note:** If you get something like this:
```bash
exception in initAndListen: 10309 Unable to create/open lock file: /data/db/mongod.lock errno:13 Permission denied Is a mongod instance already running?, terminating
```

It means that `/data/db` lacks required permission and ownership.

Run `ls -ld /data/db/`

Output should look like this (`willis7` is directory owner and `staff` is group to which willis7 belongs):
```bash
drwxr-xr-x  7 willis7  staff  238 Aug  5 11:07 /data/db/
```
