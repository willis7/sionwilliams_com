+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2015-03-07T20:46:13+01:00"
menu = ""
tags = ["vagrant", "ec2", "aws", "docker", "microservice", "gradle"]
title = "Vagrant, Amazon EC2, Docker and Microservices pt1."
+++

Microservices are all the rage at the moment, but from my experience they just move the bottleneck. Yes, the speed of development increases massively, but it does so at the cost of an increased dependency on the Build and Ops guys.

This blog series is about using Docker to run a complete and fully functional microservice in the cloud using Vagrant, Amazon AWS and Docker. The goals are as follows:

* Provisioning of the EC2 instance should be automated
* The microservices should run in their own containers
* The setup and configuration of the containers should be fully automated, no manual steps required
* Capture everything in a GitHub project.

The idea here is if we can automate the whole process, then we will quickly see the real benefits of using a microservice based architecture.

Lets introduce the tools...

## Vagrant

Vagrant is a nice way to manage our EC2 instances. We can use Vagrant to create and instance and provision the box to a state we desire.

Once Vagrant is installed on your dev machine, to use the `AWS` provider type in Vagrant we will need to install the Vagrant AWS plugin. That can be done with the following command:

`vagrant plugin install vagrant-aws`

NOTE: This took a while on my machine without a great deal of feedback. Just be patient, it will finish eventually.

So, now lets create our project and the Vagrantfile. Run the following commands:

```
# create a project folder
$ mkdir infra-n-app-automation

# change directory
$ cd infra-n-app-automation

# create the vagrant file
$ vagrant init
```

You should get a message something similar to:

```
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.
```

If we follow the Vagrant AWS plugin docs, we can see the basic Vagrantfile should look as follows:

```
Vagrant.configure("2") do |config|
  config.vm.box = "dummy"

  config.vm.provider :aws do |aws, override|
    aws.access_key_id = "YOUR KEY"
    aws.secret_access_key = "YOUR SECRET KEY"
    aws.session_token = "SESSION TOKEN"
    aws.keypair_name = "KEYPAIR NAME"

    aws.ami = "ami-7747d01e"

    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = "PATH TO YOUR PRIVATE KEY"
  end
end
```

The guide suggests putting your +access_key_id+ and +secret_access_key+ in the Vagrantfile, which is fine if you have a private repository, but as I plan on making this public I will set them using environment variables.

```
export AWS_ACCESS_KEY="AKXXXXXXXXXXXXXXX"
export AWS_SECRET_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

After configuring my Security Group, selecting an AMI and sorting my private key, my Vagrantfile now looks like:

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # Box configuration
  config.vm.box = "dummy"
  config.vm.box_url = "https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box"

  # Share an additional folder to the guest VM.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider
  config.vm.provider :aws do |aws, override|
    aws.keypair_name = "dev"
    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = "~/.ssh/dev.pem"

    aws.ami = "ami-234ecc54" #Ubuntu 14.04.1 LTS
    aws.region = "eu-west-1"
    aws.instance_type = "t2.micro"
    aws.security_groups = ["WebServerSG"]

    aws.tags = {
      'Name' => 'Vagrant'
    }
  end

  # Provisioning
end
```

We can now start the VM using the command:

`vagrant up --provider=aws`

and once the instance is available we can connect using:

`vagrant ssh`

finally, when we want to stop the instance we can run:

`vagrant halt`

### Gotchas

I had a few challenges when I first started with Vagrant and AWS. They were:

* *Security Groups* - You will noticed I used the +WebServerSG+ group. I set this up as per the Amazon documentation found [here](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Scenario3.html#SecurityGroups-3). Until I made this change I was hanging at the "_Waiting for SSH to become available..._" stage.
* *AMI* - If you want to use the free tier I would recommend going through the Amazon "Launch Instance" wizard and recording the AMI id for your region and price plan. I found some of the online examples simply didn't exist and were region specific.

## Conclusion

This concludes part one of the tutorial. We can now create and control the lifecycle of an EC2 instance, and in part two we will install Docker and any other dependencies.

The source can be found in the repository below:
https://github.com/willis7/infra-n-app-automation

## Update! *Edited: 10-03-2015*

Be very careful with your Amazon details on the web. I have provided a solution above for removing them from your source code. For a more in depth example see, [here](http://www.devopsdiary.com/blog/2013/05/07/automated-deployment-of-aws-ec2-instances-with-vagrant-and-puppet/).Dont end up like this poor fella: [My $500 Cloud Security Screwup](https://securosis.com/S=0/blog/my-500-cloud-security-screwup)
