---
title: "Impact Over Elegance: Why Architecture and Impact Intelligence Will Define the AI Coding Era"
date: 2025-10-13T20:23:43+01:00
draft: false
toc: false
images:
tags:
   - ai
   - platform
---

The next wave of great products won't be won by who ships the most elegant code. What will matter is who gives machines the right boundaries, who encodes intent into systems, and who can prove that shipped features move the numbers that matter.

That's why I believe two ideas are converging fast: [architecture is back](https://medium.com/@craig_32726/agile-is-out-architecture-is-back-7586910ab810), and [impact intelligence](https://martinfowler.com/articles/impact-intel.html#ImpactIntelligence) is the new currency.

## The Bet Businesses Will Make

AI is already good enough to generate "working" code quickly. It is also good at producing a lot of slop—duplication, leaky abstractions, hidden complexity, and glue logic that pushes today's effort into tomorrow's backlog.

**Here's the uncomfortable truth**: if the impact of shipping that slop is consistently greater than the cost of carrying it, most businesses will accept the mess. They'll pay the interest if the returns justify it.

This isn't cynicism—it's capital allocation. But it only works if two things are true:

- You can bound the mess with strong architecture so it doesn't metastasize.
- You can reliably measure impact so you know the trade was worth it.

Enter: architecture for machines and impact intelligence for leaders.

## Architecture in an AI-first Workflow

When AI generates code, the developer's job shifts from implementation to environment design. You're not just writing for the next human—you're writing for the next model invocation. That changes the craft.

Architects in this era do five things unusually well:

- **Design legible systems.** Consistent patterns, clean contracts, and predictable naming so models "see" what right looks like.
- **Encode guardrails.** Types, schemas, tests, linting, scaffolds, and example repos that bias AI toward safe paths.
- **Curate examples.** Remove contradictory styles; treat the codebase like training data.
- **Optimise prompt surfaces.** Clear interfaces, stable module boundaries, and templates that become repeatable prompts.
- **Review for coherence.** Not "does it run?" but "does this choice simplify the system six months from now?"

This is how you let AI move fast without mortgaging the future.

## Impact Intelligence: the Missing Feedback Loop

Shipping is output. Impact is outcome. Most organisations still conflate the two. The result is the classic spray-and-pray feature factory: more stuff, unclear value, growing run costs.

Impact intelligence fixes this by making business impact observable and attributable enough to guide investment.

The core moves:

- **Define an impact network.** Map proximate metrics (feature-level) to downstream business metrics (retention, margin, cycle time, revenue). It's more KPI tree than OKR deck.
- **Pay down measurement debt.** Instrument for impact at build time. Emit structured business events. Create dashboards for both proximate and downstream effects.
- **Validate and learn.** Compare projections to actuals, run impact retros, and refine estimates. When true attribution is hard, use contribution analysis and simple heuristics.
- **Report Return on Projection (ROP).** If we projected +5% and delivered +4%, ROP is 80%. It's not perfect ROI—but it's far better than vibes.

**A pragmatic trade-off:** impact beats elegance… until it doesn't "Businesses won't care about technical debt if impact > cost." I believe that's where we're heading. But there's a nuance: costs are nonlinear and often lagging. Some debts are cheap; others carry tail risk.

Make the trade-off explicit with an Impact-to-Debt Ratio (IDR):

- **Numerator:** expected annualised business impact (incremental gross margin, risk reduction, cash flow).
- **Denominator:** annualised total cost of ownership including:
  - Cloud/infra burn and unit economics
  - Developer time to change (friction, context switches, onboarding drag)
  - Reliability and incident risk
  - Compliance and security exposure
  - Opportunity cost from slower iteration

Ship when IDR > 1 and rising. Refactor when IDR trends down or volatility increases. Decommission when IDR persistently < 1.

**A simple operating model:** direction, velocity, feedback

{{< figure src="/img/ai-op-model.png">}}

This is how you move fast without getting lost.

## How this changes roles

- Tech leads become impact architects. They own system coherence and ensure each change has a measurable hypothesis tied to business metrics.
- Product managers become portfolio investors. They trade bets across an impact network, report ROP, and stop funding low-yield streams—even when the code "works."
- Engineers become curators and librarians. They maintain examples, scaffolds, and tests that guide AI. They ship instrumentation as a first-class requirement.
- CFOs get a shared language. ROP and IDR turn delivery into comparable bets, not inscrutable burn.

## A Quick Example

Say you ship an AI customer-support chatbot.

- **Proximate impact:** "virtual assistant capture" (satisfactory sessions/hour).
- **Downstream impact:** reduced call volume adjusted for customer growth, and ultimately lower cost-to-serve without harming CSAT.
- If capture improves but call volume doesn't budge, you didn't create impact—you created maintenance.

This is why instrumentation and attribution matter. And why decommissioning is a feature.

## Objections you'll hear—and how to answer them

- "This will slow us down." We're trading a bit of upfront accuracy for compounding speed later. Speed without direction just creates future drag.
- "It's not agile." We're not writing a 50-page spec. We're documenting a testable impact hypothesis and instrumenting to learn.
- "Innovation isn't predictable." Great—then be honest about uncertainty, label bets as exploratory, and size them accordingly. Measure anyway.
- "Our PMO handles this." Most track output, not impact. If you already have robust impact validation, fantastic—plug into it. If not, start simple.

## What to start on Monday

- Add impact hypotheses to every significant change. "We expect X to move Y by Z% within T weeks."
- Instrument for impact as part of done. Emit business events; wire dashboards when you ship.
- Pilot ROP reporting for one product area. Share projection vs. performance with the leadership team.
- Create a machine-legible architecture starter. Repo templates, patterns, example tests, and naming conventions AI can mirror.
- Run monthly impact retros. Celebrate bets that paid off; stop funding those that don't. Remove unused features to lower run costs.

The meta-shift In 2005, speed was the bottleneck. In 2025, direction is. AI gives us velocity; architecture gives us guardrails; impact intelligence gives us truth.

So yes—ship fast. But ship like an investor:

- Design systems AI can extend safely.
- Treat the codebase as training data for your machine teammate.
- Make impact measurable and comparable.
- Fund what works. Decommission what doesn't.

What pushed me to write this wasn’t just that AI can write code—it’s that AI happily works around messy code. LLMs don’t care about slop; they route through it as long as the contracts are clear. That changes what we optimise for. We should care less about lines and elegance when the impact outweighs the carrying cost, and care more about architecture so the code does what it’s supposed to. The two essays I cite snap this into focus: architecture is the tool that bounds the mess; impact intelligence is how we prove the trade was worth it. Companies that practice both will win.
