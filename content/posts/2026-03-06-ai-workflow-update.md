---
title: "2026 March AI Workflow Update: Gemini Pro, M2.5,OpenAgentsControl, and JCodeMunch"
date: 2026-03-06T11:19:00Z
draft: false
toc: false
tags:
  - ai
  - gemini
  - OpenAgentsControl
  - JCodeMunch
---

I'm forever changing my workflow as new tools are developed and better models become available. It's not just a matter of chasing shiny objects - it's about staying efficient, reducing costs, and leveraging what's actually *best* for each task rather than defaulting to the most expensive option.

This is the first installment in what I'm making my formal record of how my AI engineering workflow evolves. Let me walk you through the significant changes I've made recently.

## Strategy 1: Smart Model Selection

### Moving Away from Opus 4.6

I've been experimenting heavily with **Google's Gemini 3.1 Pro**, which has become my new default for reasoning: it's genuinely powerful *and* cheap. Opus 4.6, while excellent, is horrendously expensive. When you're running agents repeatedly or working with large codebases, that cost compounds quickly.

**Gemini 3.1 Pro** delivers strong performance on multi-modal reasoning tasks and coding work without the bill shock. It's replaced Opus 4.6 as my go-to for general AI tasks.

For smaller, more granular tasks - formatting changes, minor refactors, quick reviews - I'm now using the **Minimax M2.5** model. This model consistently scores highly on [software engineering benchmarks](https://www.swebench.com/), which makes it perfect for "noddy changes" that don't justify the compute expense of larger models.

The key insight here: **Model selection is part of cost optimisation**. Not everything deserves the most expensive model. Not everything needs Opus. Matching the right model to the right task is as important as the architecture itself.

## Strategy 2: Agent Infrastructure with OpenAgentsControl

Beyond model selection, I've found **[OpenAgentsControl](https://github.com/darrenhinde/OpenAgentsControl/tree/main)** to be transformative.

This is a project by **Darren Hinde**, who runs an excellent [YouTube channel](https://www.youtube.com/@DarrenBuildsAI).

What OpenAgentsControl does is install a suite of **predefined agents and subagents** with built-in tasks and commands - essentially an all-in-one solution you can bolt onto any project. Out of the box, you get:

- **OpenAgent** agent (well orchestrated small tasks)
- **OpenCoder** agent (well orchestrated problem solver)
- **Conventional commit** command (semantic commits without thinking)
- **Code optimisation** command (refactor and improve)

It's efficient, and the commands available are genuinely useful. The separation of concerns produces better results than asking a single agent to "do everything well."

## Strategy 3: Code Repository Indexing for Token Efficiency

Here's where the real cost savings compound: **[JCodeMunch](https://github.com/jgravelle/jcodemunch-mcp/tree/main)**, an MCP (Model Context Protocol) that indexes your code repository.

Instead of sending the entire codebase to an AI on every query, JCodeMunch:
1. **Indexes** your repository once
2. **Stores** that index locally
3. **Makes future lookups** dramatically more token-efficient

This is critical because - and this deserves emphasis - **it doesn't make sense to use an agent to regularly review code if you've already indexed it**. Once indexed, you can query that index directly, preserving tokens for tasks that actually require reasoning rather than retrieval.

I'm now employing two strategies to minimise spend:

1. **Model selection**: Picking the right model for each task's complexity
2. **Indexing**: Reducing token waste through pre-computed code analysis

Together, these cut costs while keeping agent performance high.

## The Workflow in Practice

Here's how these pieces fit together in my actual workflow:

1. **Initialisation**: JCodeMunch indexes the codebase once
2. **Iteration**: OpenAgentsControl agents handle commits, refactoring, and other tasks - but they query the index rather than re-scanning the full repo
3. **Model routing**: Gemini 3.1 Pro handles complex reasoning; Minimax M2.5 handles simple tasks
4. **Outcome**: Faster execution, lower token consumption, lower cost

## What I've Learned

The temptation in AI workflows is to always use the biggest, best model for everything. But that's wasteful. The real win comes from:

- **Understanding your task hierarchy**: What actually needs reasoning vs. what needs retrieval?
- **Choosing tools intentionally**: OpenCode gives me the flexibility I need; Claude Code doesn't
- **Building for efficiency, not just capability**: An indexed codebase with a lightweight agent beats a giant model scanning everything

This is the engineering mindset applied to AI - do the least expensive thing that solves the problem, and only escalate when you actually need to.

I'll be tracking how this evolves as new tools and models emerge. The AI landscape shifts fast, and the best workflow is the one that adapts to it.
