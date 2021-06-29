---
title: "VSCode Extension Recommendations"
date: 2021-06-29T19:07:01Z
draft: false
toc: false
images:
tags:
  - vscode
---

> A good set of extensions can make working with a particular workspace or programming language more productive and you'd often like to share this list with your team or colleagues.

I've been a huge fan of VSCode recently and another great feature I discovered is the extensions recommendations.

```json
// FILE: .vscode/extensions.json
{
    // See http://go.microsoft.com/fwlink/?LinkId=827846
    // for the documentation about the extensions.json format
    "recommendations": [
      // Makes it easy to create, manage, and debug containerized applications.
      "ms-azuretools.vscode-docker",
  
      // EditorConfig Support for Visual Studio Code
      "editorconfig.editorconfig",
  
      // Syntax highlighting and autocompletion for Terraform
      "hashicorp.terraform",
  
      // Syntax highlighting and autocompletion for Terraform
      "wholroyd.hcl"
    ]
  }
```

The example above will make recommendations to other maintainers on what they should install in VSCode. As the project above was using Terraform I recommend other maintainers install the HCL extension along with the official Terraform extension from Hashicorp. I'm also a big fan of editorconfig so I throw that in for good measure too.

⚠️A word of caution: not everyone will like the theme or icon pack that you use, so only recommend the bare minimum to run the project effectively.

⚠️⚠️Another word of caution: not everyone uses VSCode. It's only a matter of time until they catch up, but for projects that you know dont use vscode, you should probably respect that and not add this file to the repo.
