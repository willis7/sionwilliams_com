+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2012-05-19T09:24:52+01:00"
menu = ""
tags = ["weblogic", "wlst"]
title = "Weblogic/WLST - Packing and Unpacking a domain"
+++

When you start working with distributed domains there will come a time when you need to pack the domain and unpack it in its distributed areas.

Whether you create your domain via the GUI or by scripting, all you're actually doing is creating a series of configuration files. At this point you're not actually starting any servers - that comes later.

Lets consider the following architecture:

* AdminServer = Machine A
* Managed01   = Machine B
* Managed02   = Machine C
* Cluster01   = Managed01, Managed02

So, you run through the wizard and configured the domain above. You should now notice your domain has been created on Machine A, but if you log into Machine B or C nothing exists. This is where the need to Pack and UnPack comes in.

To pack the domain run the following WLST script:

```python

# Create a template .jar of an existing domain
# Open an existing domain

readDomain(domainDirName)

# Write the domain configuration information to a domain template
writeTemplate(templateName)

closeDomain(templateName)
```

This script opens the domain and extracts (as a jar) the configurations required
for the servers that will reside on Machines B and C. It's a skeleton configuration
because the Admin server information will be excluded - a domain only ever has 1
Admin server.

Now that we have a templateName.jar we can send it to the machines that the rest
of the domain will reside on and run the unpack script on each machine:

``` python
# unpack.py: convert from unpack command to wlst script
# This script shows how to convert from the unpack command to a wlst script.
# Note that the domain and template values, and the options to setOption, must be single-quoted
# Specify the template that you want to use

readTemplate('c:\wls9\user_templates\wlst_wls_template.jar')

# If you specified the -username and -password option in the unpack command,
# Specify them here. Otherwise, delete these lines`
# Note that the domain_name field here is just the name of the domain, not the full path as specified in writeDomain below

cd ('/Security/<domain-name>')
create (<user_name>,'User')
cd ('User/<user_name>')
set ('Password',<password>)

# analogous to unpack -java_home
setOption('AppDir',<app_dir>)

# write the domain
writeDomain(<domain>)

closeTemplate()
```