---
title: "Using Dotfiles to Manage Agentic Workflow Artefacts"
date: 2026-03-13T11:44:00Z
draft: false
toc: false
tags:
  - ai
  - automation
  - howto
  - dotfiles
---

I love agentic programming. Over the past two years I've built several CLIs and webapps to smooth my workflow. One problem persisted.

Design a command for Project A, and you want it in Project B. Build a sub-agent fluent in Golang, and it sits useless in your JavaScript work. You need selectivity - certain artefacts for certain projects, no duplication.

My instinct: build a centralised repository of artefacts, then write a tool to symlink them across projects.

Then I stopped. For four years I've used **Dotfiles** by GitHub user [rhysd](https://github.com/rhysd/dotfiles). Despite its name, Dotfiles does more than manage application configuration. It links paths from a central location to project locations and creates symlinks between them. It's OS-agnostic too.

The insight: Dotfiles traditionally syncs application config across machines. Nothing prevents using it to manage agentic artefacts across projects.

## Installing Dotfiles

Download the binary and add it to your PATH or if you use Brew Bundle:

```bash
go "github.com/rhysd/dotfiles"
```

Create a JSON file listing the paths to link:

```json
{
  "skills/golang-review": "~/Code/my-golang-project/.opencode/skills/golang-review"
}
```

Then run:

```bash
dotfiles link .
```

Symlinks are created instantly.

## Why This Works for Agentic Artifacts

You maintain a centralised repository - agents, commands, skills. Each project declares what it needs. A Golang project links to the golang-review agent. A JavaScript project links elsewhere. No copying. No duplication.

Since they're symlinks, updates to the central artefact propagate instantly to all projects that reference it. Change once, affect everywhere. The approach works locally and scales across machines.

## Avoiding Global Installs

Most agentic coding platforms offer a global install option. Install once, use everywhere. The appeal is obvious. The problem is just as clear.

A Golang-specialised agent sitting in your global tools is useless noise when you're working on JavaScript. Worse, it pollutes the context window. Every invocation carries the baggage of tools that don't apply. Your agent spends tokens reasoning about capabilities it shouldn't use in your current project.

Per-project selectivity isn't just cleaner. It's more efficient. You want your agents working within the constraints of what's actually relevant. A JavaScript project should only see JavaScript tools. A Golang project should only see Golang tools.

Dotfiles enforces this discipline. It forces you to declare what each project needs. No global dumping ground. No bloat. Just the artefacts that belong in that context, symlinked from a central source.

## The Realisation

The instinct in agentic programming is to build. See a problem, write code. Sometimes right. But better engineering recognises when something is good enough.

Dotfiles wasn't built for agentic workflows. It syncs config across machines. Yet the underlying mechanism - link paths from a central location to where needed - is exactly what I required. Repurposing a proven tool beats building anew.

That's not settling. That's engineering.
