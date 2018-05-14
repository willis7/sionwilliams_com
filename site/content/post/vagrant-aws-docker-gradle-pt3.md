+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-03-16T20:46:13+01:00"
menu = ""
tags = ["vagrant", "ec2", "aws", "docker", "microservice", "gradle", "ansible"]
title = "Vagrant, Amazon EC2, Docker and Microservices pt3."
+++

## Part 3 - a bit of back pedaling

After thinking about the 'hack' I put in to get Puppet installed on the box before I could use it, I felt a little dirty, and decided that maybe Puppet wasn't the best decision after-all.

So, the problem is that I need an agent installed before I can provision my box, but I'm trying to automate the provisioning - catch 22. Here's where Ansible has really stepped up.

I suppose we could have continued using the shell provisioner, but Adam Brett raises a good point on this:

_"Why not just use Bash scripts, then? Ansible has an edge over Bash scripts because of its simplicity. Ansible just uses a list of tasks to run in YAML2 format. Ansible also comes with idempotency out of the box. That means you can run the same operation numerous times, and the output will remain consistent (i.e. it won't do something twice unless you ask it to). You can write Bash scripts this way, but it requires quite a bit more overhead."_

## Ansible

There is one small caveat with Ansible - we have to install it on the machines that will be running the Vagrant script (Ansible call it the control machine). I've added a link to the docs down in the resources section.

Puppet has manifests, Chef has cookbooks and Ansible has playbooks.

As we did with Puppet, lets create an Ansible dev environment:

```
# create a dir for ansible scripts from project root
$ mkdir playbooks

# change directory
$ cd playbooks/

# create a playbook file for vagrant
$ touch playbook.yml
```

The tasks are the same as before, and in the +playbook.yml+ we express them in the following way:

```
---
- hosts: all
  sudo: true
  tasks:
      - name: update apt cache
        apt: update_cache=yes
      - name: install docker.io
        apt: name=docker.io state=present
```

Now we need to tell Vagrant that we want to use the Ansible provisioner. Replace the previous provisioner blocks with the following:

[source, ruby]
```
config.vm.provision :ansible do |ansible|
    ansible.playbook = "playbooks/playbook.yml"
end
```

You can now run +vagrant up --provider=aws+ and you should see Ansible being used for the provisioning:

```
PLAY [all] ********************************************************************

GATHERING FACTS ***************************************************************
ok: [default]

TASK: [update apt cache] ******************************************************
ok: [default]

TASK: [install docker.io] *****************************************************
changed: [default]

PLAY RECAP ********************************************************************
default                    : ok=3    changed=1    unreachable=0    failed=0
```

Again, we can ssh into the box and prove Docker is installed:

```
# ssh into our instance
vagrant ssh

# run docker
sudo docker run -i -t ubuntu /bin/bash
```

## Refactoring for reusability

At the moment our playbook is really simple, so you could argue its not worth refactoring, but as this is a learning exercise I think its worth going through the motions.

##= Separation of concerns

The Wikipedia definition goes as follows:

_"In computer science, separation of concerns (SoC) is a design principle for separating a computer program into distinct sections, such that each section addresses a separate concern. A concern is a set of information that affects the code of a computer program."_

The Docker installation task is a nice place to add some separation. Whilst the task is very simple at the moment, it could get more complex over time. Keeping it separate makes the code easier to read, but also sets us up to be able to reuse in the future.

Start by adding a new directory called +tasks+ and then add a file for docker, +docker.yml+:

```
---
- name: install docker.io
  apt: name=docker.io state=present
```

NOTE: Don't get caught out by whitespaces. They will fail your build.

Now, we need to update our playbook to include this new file. Change your +playbook.yml+ file to match the following:

```
---
- hosts: all
  sudo: true
  tasks:
      - name: update apt cache
        apt: update_cache=yes
      - include: tasks/docker.yml
```

Test this new configuration by running +vagrant destroy+ followed by +vagrant up --provider=aws+ again. Everything should work exactly as before.

Resources:

* [Installing the Control Machine](http://docs.ansible.com/intro_installation.html)
* [Vagrant & Ansible Quickstart Tutorial](https://adamcod.es/2014/09/23/vagrant-ansible-quickstart-tutorial.html)
