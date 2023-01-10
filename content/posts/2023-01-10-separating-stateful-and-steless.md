---
title: "This is why you should keep stateful and stateless resources together"
date: 2023-01-10T09:27:39Z
draft: false
toc: false
images:
tags:
  - cdk
  - policy as code
---

[A blog of the same title](https://theburningmonk.com/2023/01/this-is-why-you-should-keep-stateful-and-stateless-resources-together/) from another author was recently shared in my company Slack, and I was about to write a reply, but I thought it would help if I wrote my response in long form.

At a principle level, I agree with the author; to achieve high cohesion, both types of resources should be kept together. A Stack represents the system, so all resources that form the system should be represented this way.  In this contrived example, I won't get into the nuance of lambdas and domains.

One of the biggest arguments for separation is accidental deletion, or in other words, human error. I firmly believe there is no such thing as human error - there are only fragilities in the system/environment in which humans operate.

>there is no such thing as human error - there are only fragilities in the system/environment in which humans operate

So then, how do we stop good people from doing bad things? The author explains that separating stateful from stateless is just moving the problem. I agree. A better alternative to stop these accidents would be to apply guardrails. It's possible with tools like [Open Policy Agent](https://www.openpolicyagent.org/) to highlight when something has a high blast radius i.e. the potential damage is high.

Here's an example of how you could use the Open Policy Agent (OPA) to protect a resource with a large blast radius in the AWS Cloud Development Kit (CDK):

```typescript
import * as cdk from 'aws-cdk-lib';
import * as opa from 'cdk-opa-policy';

class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the policy to be used by OPA
    const policy = {
      "version": "1.0.0",
      "policy": [
        {
          "effect": "deny",
          "operations": [
            {
              "type": "aws:Create",
              "resource": "aws:rds:cluster"
            }
          ],
          "when": {
            "blast_radius": {
              "eq": "high"
            }
          }
        }
      ]
    };

    // Apply the policy to the stack
    new opa.OPAPolicy(this, 'MyPolicy', {
      policy: policy,
      resourceIdentifier: (stack: cdk.Stack) => {
        return {
          stackName: stack.stackName,
          blastRadius: 'high'
        };
      }
    });

    // Define an RDS cluster
    new cdk.AWS.RDS.Cluster(this, 'MyCluster', {
      // ...
    });
  }
}

const app = new cdk.App();
new MyStack(app, 'MyStack');
app.synth();
```

In this example, the `policy` variable defines a policy that denies `aws:Create` operations on `aws:rds:cluster` resources when the `blast_radius` is set to `high`. The `resourceIdentifier` function tells OPA how to identify the current stack and its associated blast radius. In this example, it returns an object that contains the stack's name and the blast radius.

When you run `cdk deploy`, the OPA will check the policy before creating the resources, and since the blast radius is high, it will deny the creation of the RDS cluster.

It's important to note that this is just a simple example, and you can define more complex policies for different resources and blast radius levels. Also, you could have different operations and rules depending on the user trying to access or create the resources.

There's a lot you can do in your workflow to make this safer - for example, you might opt to have extra reviews when they try to modify items with a high blast radius.

## Summary

The original blog provided other challenges that may encourage this type of a decision, but I didn't touch on them in this blog because I felt the author did a good job explaining them.

> The takeaway from this article is that you should avoid making compromises on hard-earned principles because the system is fragile. Instead, seek to make the system anti-fragile.

The takeaway from this article is that you should avoid making compromises on hard-earned principles because the system is fragile. Instead, seek to make the system anti-fragile. Suppose you're fortunate enough to have a platform engineering squad. In that case, it might be a good idea to agree on what resources are considered high-risk and have them write a library which decorates the resources with policies like the one I described above. Then, when the various application squads use the library, they get the constraints built in.
