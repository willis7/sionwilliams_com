---
title: "2026 May AI Workflow Update: Letting Claude Into the Vault"
date: 2026-05-06T20:00:00Z
draft: false
toc: false
tags:
  - ai
  - claude
  - obsidian
  - workflow
  - productivity
---

I'm overdue an update. Two months on from [my last workflow post](https://sionwilliams.com/posts/2026-03-06-ai-workflow-update/), much has shifted - some of it from new tools, more from joining an organisation that takes AI seriously.

The biggest change: I've handed my Obsidian vault to the agent.

That sentence took a while to write. I've kept my personal knowledge management deliberately portable for years - no vendor lock-in, no proprietary formats, no agent stitched into the substrate of how I think. But the trade-off shifted, and I conceded defeat.

## A Word on Budget

Every person at my new organisation has a $2,000 monthly Claude budget that renews each month. I have not seen this anywhere else. At my last place, debates over which AI tool to standardise on lasted weeks. Here, we get the lot - and the means to use it properly.

I've written before that an AI strategy without a budget is theatre. This is the inverse: real intent, backed by real spend. It changes how you think. You stop rationing. You start experimenting.

## What Broke My Resistance

The trigger was a demo from a senior engineering manager on another team. He had wired Claude into his Obsidian vault. His agenda built itself each morning. Project notes stayed current without manual upkeep. A daily recap rolled up at the end of the day. He had even streamed real-time service-outage alerts straight into the vault.

It was the missing link. I had been treating AI and personal knowledge management as separate disciplines. He had fused them.

So I got stuck in.

## The Today Command

My daily-note workflow has been the same for four years. Open today's note. Create a child note for each meeting, with a timestamp. Write into those during the day. At the close of play, capture the highlights - anything from email, Slack, or a corridor conversation that mattered.

Manual, repetitive, and the obvious first thing to automate.

I built a `/today` command. It does what I'd do, in the order I'd do it:

- Resolve today's daily note.
- Fetch the calendar.
- Drop declines, personal events, room bookings, and Zoom-only entries.
- Resolve attendees to wikilinks.
- Format the agenda, draft the daily note, and confirm with me before saving.

If the calendar lookup fails, the command says so. No silent half-state.

This works because Obsidian now ships a command-line interface that Claude drives faultlessly, plugins included. Templater - the template engine I rely on - composes meeting notes that pull context from the previous occurrence, ready for me to walk into the call.

## The Skills Are the Secret

The command itself is dumb. The intelligence lives in the skills it loads:

- A skill for the people graph.
- A skill for daily notes.
- [A skill for Obsidian's flavour of Markdown](https://github.com/kepano/obsidian-skills/tree/main/skills/obsidian-markdown).
- [A skill for the CLI](https://github.com/kepano/obsidian-skills/tree/main/skills/obsidian-cli).
- A skill for PARA, the method I use to organise everything.

Skills enforce my conventions: how I file, how I link, how I name. When the agent surprises me with a wrong move, I update the relevant skill. The commands rarely change. The skills are forever in flux.

This is the part I had missed. Without skills, the agent bends my vault to its defaults. With them, the agent serves the system I've built.

## The Wrap-up Command

The mirror of `/today` is `/wrapup`. It runs at end of day, reads my meeting notes, polls Slack, Jira, Confluence, and email, then reconstructs what actually happened.

The trick is that it appends to existing notes rather than rewriting them. My morning agenda and my afternoon evidence live in the same daily note, side by side. Nothing gets clobbered.

This was problematic before the Obsidian CLI. It's the killer feature of the setup.

## The Rest of the Family

A few siblings have grown up around `/today` and `/wrapup`:

- `/week-summary` - pulls the most important moments from each daily note and writes a weekly note.
- `/month-summary` - the same, one level up.
- `/brag-review` - asks me about highlights, rolls them into the weekly note, then asks which were the most impactful and gives me space to elaborate. I've always been hopeless at remembering my own wins. This command means quarterly and annual reviews stop being archaeology.

## The Project Wiki

The piece I'm most pleased with is what I call the **Project Wiki**. The idea draws from Andrej Karpathy's writing on personal wikis.

For each project, I keep a folder of templated notes that tell the agent how to work in that context: conventions, stakeholders, decisions, open questions, sourced material. Whenever a link or a snippet lands in my lap - a Slack message, an article, a deck - I register it with the agent. The agent files it according to the project's conventions.

The wiki thickens over time. The agent asks me clarifying questions; I answer. By the time I need to draft a strategy document or brief a stakeholder, I'm working from a well-referenced knowledge base instead of a blank page and a panicked search history.

The compound interest is real.

## Where This Leaves Me

Two months in, the principle holds: the value isn't in the model. It's in the surface area between the model and the work I actually do. Models will keep improving. The interface to my own thinking is what I have to design, and re-design, and re-design.

I'll keep posting these as the workflow shifts. The next one will be sooner than this one was.
