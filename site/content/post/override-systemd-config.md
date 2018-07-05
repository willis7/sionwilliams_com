+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2018-07-05T00:01:13+01:00"
menu = ""
tags = ["systemd", "docker"]
title = "Override Systemd Config"
+++

I was faced with the task of enabling the remote API for Docker. Whilst trying a few different solutions (adding `hosts` to `daemon.json`), I quickly learnt that I needed to pass parameters to the `dockerd` command like `/usr/bin/dockerd -H tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock`. As I'm using Systemd I knew I needed to edit the service file, but I was also mindful that any future updates to Docker would blow my changes away. What I provide below is a strategy to override Systemd settings in a non-destructive way.

On Centos 7, docker installs the service in `/usr/lib/systemd/system/docker.service`. We can view the current config with the simple command `systemctl show docker`. To edit this file use `systemctl edit docker` and the result is a new file which is created at `/etc/systemd/system/docker.service.d/override.conf`. I then editted the file with my editor and added the following:

```
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock
```

If you're using a configuration management tool you can make the file in the correct location, perform a `systemctl daemon-reload` followed by `systemctl restart docker` and the service should get the new updates. Use `systemctl show docker` to verify the changes.

The example above also works for setting environment variables as seen in the snippet below:

```
[Service]    
Environment="HTTP_PROXY=http://proxy.example.com:80/" "NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"
```