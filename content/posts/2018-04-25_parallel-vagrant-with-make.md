---
title: "Parallelise Vagrant Up With Make"
date: 2018-04-25T10:02:44Z
draft: false
toc: false
images:
tags:
  - howto
  - make
  - devops
  - vagrant
---
Spinning up more than one Vagrant box can be slow and tedious. Below is a solution for speeding up the `vagrant up` process when you need more than one box and Docker isn't a valid option.

Annoyingly, this solution requires a `Vagrantfile` per machine, and wont work if you put loops in your `Vagrantfile`. Here's my folder structure:

```
.
├── Makefile
└── vagrant
    ├── node-1
    │   └── Vagrantfile
    ├── node-2
    │   └── Vagrantfile
    └── node-3
        └── Vagrantfile
```

The `Makefile` is where the magic happens...

``` makefile
node-1:
	cd vagrant/node-1 && vagrant up

node-2:
	cd vagrant/node-2 && vagrant up

node-3:
	cd vagrant/node-3 && vagrant up

rm-node-1:
	cd vagrant/node-1 && vagrant destroy -f

rm-node-2:
	cd vagrant/node-2 && vagrant destroy -f

rm-node-3:
	cd vagrant/node-3 && vagrant destroy -f

up: node-1 node-2 node-3

destroy: rm-node-1 rm-node-2 rm-node-3
```

In the snippet above I create a task per node (1,2,3) and operation (up, destroy), then I create 2 wrapper tasks which calls their respective node operations. So, to start all nodes I have `up: node-1 node-2 node-3` and to destroy all nodes I have `destroy: rm-node-1 rm-node-2 rm-node-3`.

If you were to call `make up` from the command line you wouldnt get any benefit because Make will default to calling each task in order. However, if you call the task with the `-j` flag and provide a number of executors, it will call them in parallel.

Here's the difference in times I achieved comparing the 2 options.

`make up  36.04s user 34.39s system 34% cpu 3:22.86 total`
`make -j3 up  30.64s user 30.38s system 78% cpu 1:17.38 total`

It's worth noting here that there's no benefit to using a number greater than the total number of machines you're building. It's also worth saying this isn't a pretty solution, but it does get the job done.