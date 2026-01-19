---
title: "How I use AI"
date: 2026-01-18T09:00:00+01:00
draft: false
toc: false
images:
tags:
  - ai
  - leadership
  - adoption
  - case-study
series:
  - "Organisational AI Adoption"
---

In this post, I share how I use AI to augment my work as an Engineering Manager: improving my knowledge, writing better notes, challenging my own thinking, and becoming a more effective leader. Just as importantly, I'll also cover where I _don't_ use AI, and why.

This isn't a list of tools or prompts for their own sake. It's an attempt to show how I think about where AI earns a place in my workflow - and where it doesn't. The common thread is simple: AI should support judgment, not replace it.

## Understanding the Risks

By now, you've probably read countless warnings about AI hallucinations, so I won't dwell on those here. Instead, I want to focus on risks that show up more subtly in day‑to‑day leadership work.

### Privacy

Unless you work entirely in the open, your organisation almost certainly has information it doesn't want leaking outside its boundaries.

For that reason, I'm careful to use AI tools that keep sensitive information within the organisation's control, rather than sending it to third‑party services by default. This means sensitive data stays within our own infrastructure, which gives me the confidence to actually _use_ AI rather than constantly second‑guessing what I'm exposing. I will provide a more detailed explanation of this in a future post.

To support this, I use [Ollama](https://ollama.com/) to run open‑weight (free) models locally on my machine. While local models aren't always as performant or feature‑rich as hosted alternatives, the trade‑off is worth it for me. The goal isn't peak benchmark performance - it's freedom to experiment.

> If you come here for the tools, then I can also recommend [MSTY Studio](https://msty.ai/) for a much less technical user experience.

## Workflows

### Personal Knowledge Management

I've used [Obsidian](https://obsidian.md/) daily for several years to capture notes, ideas, and fragments of thinking. It's become the backbone of how I process work and reflect on it.

More recently, I've started using AI to support that practice.

#### Weekly Rollups

I write a note every single day with three sections: **Work Todos**, **Events / Deadlines / Commitments**, and **Notes**. At the end of each week, I use the following prompt to synthesise what I've captured:

```markdown
**System Role:**
You are an AI assistant designed to help synthesise a user's journal and meeting notes from the past week. Your goal is to provide a structured, factual summary while surfacing key themes, energy trends, emotions, and inconsistencies. The output should include a **summary**, **patterns and insights**, and a **reflection prompts section** for further thought.

---

Extract relevant insights based on the following categories:

# 1. Summary of the Week

Provide a structured summary of key events, reflections, and notable insights. Organise by:

- **Work & Productivity**: Major projects, challenges, and accomplishments.
- **Health & Energy**: Physical, emotional, and mental well-being. Highlight what boosted or drained energy.
- **Relationships & Social**: Interactions, connections, and notable moments with others.
- **Personal Growth & Learning**: New skills, knowledge, or mindset shifts.
- **Gratitude**: Things the user expressed appreciation for.

# 2. Patterns & Insights

- Identify **recurring themes** across the week.
- Highlight **shifts in priorities, mindset, or emotions**.
- Flag **inconsistencies** (e.g., saying rest is a priority but overworking).
- Summarise **energy trends** - what gave energy and what drained it?

# 3. Reflection Prompts

Provide 3-5 thought-provoking questions based on the user's entries. These should:

- Encourage deeper self-awareness.
- Challenge the user to think about inconsistencies or recurring struggles.
- Help refine priorities or decision-making for the next week.

---

**Input:**
@vault process all notes from the past 7 days.
```

**Takeaway:** the value here isn't the summary - it's the reflection loop it creates.

#### Enhancing Source Notes

_Source notes are a single page document capturing ideas and knowledge from the things I read or watch._

I read a lot, and I capture what I find interesting. I deliberately avoid using AI to write my own takeaways, but I do use it to surface things I might have missed.

Each source note includes a section generated with the following prompt:

```markdown
Create a memo based on the provided context. The user finds this interesting because: « {{ input }} »

Generate:
1. A well‑structured markdown memo with sections for why it's interesting, key points, links, and images.

Focus on extracting valuable information and making it easy to reference later.
```

**Takeaway:** used this way, AI becomes a second pass - not a substitute for thinking.

### Dictation

I used to spend around 30 minutes each evening typing up notes. By that point in the day, I was tired and inevitably forgot details.

Now I use [Alter](https://alterhq.com/) for dictation (previously, [SuperWhisper](https://superwhisper.com/)). With newer local speech‑to‑text models like Parakeet V3, I can capture the same material in minutes, with very little editing required.

I have also been experimenting with using AI to cleanup my dictations. This has been somewhat problematic because the models frequently attempt to treat the dictation like a prompt. I pan on experimenting with this some more, but for now I have disabled this feature in Alter.

Here's a snippet from my cleanup prompt:

```markdown
...

**Mandatory phonetic matching:** Before processing, scan for homophones—"YUNICE"→"Eunice", "file name dot jay ess"→"fileName.js", "Habi Sheikh"→"Abhishek Gutgutia". Replace silently.

</context>

<self-corrections>

**MANDATORY:** Resolve ALL self-corrections BEFORE other analysis—including within command phrases and formats themselves. Self-corrections determine final intent; everything else processes that resolved intent.


When users self-correct, DELETE rejected phrase, output only final intent.

...
```


**Takeaway:** This isn't about speed alone - it's about capturing signal before fatigue erases it.

### Product Requirement Document (PRD) Reviews

> Cautionary tale: 
> Early on, I tried using AI to review PRDs before engaging with them myself. The feedback was often good - but because I hadn't formed my own view first, I didn't absorb it properly. That gap created blind spots, and blind spots harm teams.

My approach now is simple: I always review the PRD myself first. Only after that do I use AI to challenge my thinking and catch what I may have missed.

```markdown
**Review this Product Requirements Document (PRD) for the following aspects:**

1. **Purpose and Value Proposition**
   - Does the document clearly define the product’s purpose, including the problem it aims to solve, the target audience, and how it aligns with business goals and strategies?
   - Is there a concise value proposition or elevator pitch that communicates the product's core objectives?

2. **Key Components**
   - Verify that the PRD includes all critical sections:
     - **Features and Requirements**: Are functional and non-functional requirements well-defined and clear?
     - **Release Criteria**: Does the document specify functionality, usability, reliability, performance benchmarks, and supportability for release readiness?
     - **Timeline**: Are milestones, deadlines, and dependencies realistic and clearly outlined?
     - **User Stories and Use Cases**: Are the user stories detailed enough to guide development, with success metrics included?
     - **Testing Plan and Acceptance Criteria**: Are test cases and acceptance criteria clear for validating features?

3. **Clarity and Comprehensiveness**
   - Is the PRD easy to understand for all stakeholders? Is there any jargon or ambiguous language?
   - Are assumptions, constraints, risks, and out-of-scope items explicitly stated?

4. **Alignment with Business Objectives**
   - Does the PRD align with strategic goals? Are metrics like user acquisition or revenue growth included to measure success?
   - Do the customer personas or use cases reflect real user needs?

5. **Collaboration**
   - Have all relevant stakeholders been involved in drafting or reviewing the PRD (e.g., product management, engineering, QA, marketing, sales, customer support)?
   - Is there evidence of cross-functional collaboration in defining requirements and resolving questions?

6. **Feasibility**
   - Are the proposed features technically feasible within available resources (time, budget, tools)? Does the document reflect any potential obstacles identified by engineers or architects?
   - Is usability testing or prototyping feedback incorporated into the requirements?

7. **Prioritisation**
   - Are the requirements prioritised based on business impact and feasibility? Is there a numerical scale or system that clarifies priorities?

8. **Actionability**
   - Are all requirements actionable, with enough detail to guide development without over-specifying implementation details?
   - Are wireframes or mockups included where necessary to clarify design expectations?

9. **Living Document**
   - Is the PRD structured to accommodate updates as priorities evolve during development? Are updates feasible without disrupting workflows?

10. **Collaborative Review**
    - Has a review session been organised with all stakeholders where each section of the PRD is discussed in detail? Have decision-makers in their respective areas signed off on key aspects of the document?
```

**Takeaway:** AI works best here as a second reader, not a stand‑in.

### Writing

I've never been a fan of using AI to write on my behalf. AI‑generated prose is usually obvious - and readers notice..... if you're questioning my use of em dashes, sorry, not sorry, I've been using them in my blog posts since the dawn of time.

Instead, I use AI sparingly for planning or to suggest alternative phrasing. I still enjoy writing, even if it's slower.

That may change over time. I've seen authors successfully train models on their own writing. If I ever reach a point my training data is big enough, I may revisit this. For now, the constraint is part of the craft.

**Takeaway:** keep your writing authentic, AI use is currently very obvious.

#### Strunkify This

To improve clarity, I sometimes run drafts through a prompt based on William Strunk Jr.'s _The Elements of Style_. 

_I rarely use this for blog posts as I want them to feel authentic, but I will use it often with my professional writing._

```markdown
You are an expert editor who strictly follows the principles of William Strunk Jr.’s *The Elements of Style*. Review and refine the provided text according to the following guidelines:

1. **Clarity & Brevity**
   - Omit needless words.
   - Prefer specific, concrete language over vague or abstract terms.
   - Strip away filler, redundancy, and unnecessary qualifiers.

2. **Form & Structure**
   - Ensure sentences are concise, direct, and logically ordered.
   - Use the active voice unless a clear reason justifies the passive.
   - Place emphatic words at the end of sentences for impact.
   - Maintain subject–verb agreement and parallel structure.

3. **Composition**
   - Make each paragraph about one main idea.
   - Begin with a clear topic sentence and develop logically.
   - Ensure transitions are smooth and natural, aiding flow.


4. **Expression & Tone**
   - Use definite, specific, and concrete language.
   - Avoid fancy or foreign words when plain ones will do.
   - Maintain consistency in tense, point of view, and tone.
   - Prefer the positive form (say what *is*, not what *is not*).

5. **Style**
   - Write naturally and with sincerity.
   - Revise ruthlessly to strengthen rhythm and readability.
   - Do not overstate, hedge, or qualify unnecessarily.
   - Prefer clean, vigorous phrasing over elaborate ornament.

You will always use British English (not Americanisms such as Organization, Modernize and so on). After applying these principles, return the improved version of the text and briefly explain which of Strunk’s rules you applied and why.
```

> As an aside, this book is available for free from Project Gutenberg: https://www.gutenberg.org/files/37134/37134-h/37134-h.htm

**Takeaway:** Use AI as an editor, not an author.

### Prototyping ("Vibe Coding")

Becoming a manager has a tendency to move you away from daily coding. Even if you stay technical, muscle memory fades. This is a sad reality that AI cant fix, but what it can do is make the time you do spend on projects more productive.

Agentic tooling has helped me prototype ideas quickly - especially for personal or internal tools where outcome matters more than polish. I'm honest with myself about where this code lives and what it's for.

Used deliberately, this has helped me solve problems I'd otherwise never get around to tackling.

Some fun projects/prototypes:
- [PRTool](https://github.com/willis7/prtool) - A command-line tool that fetches GitHub pull requests (PRs) for a specified time period and scope (organisation, team, user, or repository), summarises them using an LLM (OpenAI or Ollama), and outputs the result in Markdown format.
- [Impact Tree Builder](https://github.com/willis7/impact-tree-builder) - A fully-featured impact tree visualisation tool built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui.

### Hiring

With a candidate's permission, I record interviews and produce transcripts. I write my own assessment first, then use AI to analyse the transcript and compare notes - NEVER to decide, but to challenge my recollection.

In many cases, this benefits the candidate more than me. It helps surface whether my impression aligns with what was actually said, rather than what I _remember_ hearing. It's a great tool for surfacing your bias, and offering the opportunity to correct it.

**Takeaway:** humans forget things but AI's can be a good coworker who reminds you of things you missed.

### Data Analysis

As engineering leaders, we're surrounded by data. Delivery metrics, incident reports, engagement numbers, survey results, spreadsheets pulled together for a review or a board meeting. Individually, each dataset makes sense. Taken together, it's easy to lose perspective and miss patterns that matter.

This is one area where I've found AI genuinely useful.

When I'm given a spreadsheet or a collection of data, I'll often ask AI to look for patterns, trends, or anomalies - simply to tell me what it _sees_. Sometimes the observations are obvious. Other times they highlight relationships or outliers that weren't immediately apparent.

Below is an example prompt:

```markdown
I manage an engineering organisation with several teams and services. Attached are:

- The last three years of engineering metrics (e.g., deployment frequency, lead time for changes, change failure rate, MTTR, incident volume by service/team).
- Our roadmap and targets for the upcoming year, including assumptions about improvements from planned initiatives (e.g., platform consolidation, observability upgrades, test automation, team restructuring).

Acting as the Analyst, please:

1. Review the data to identify underlying trends and patterns across teams, services, and time.
2. Validate or challenge our assumptions and targets for the upcoming year.
3. Call out any risks, constraints, or blind spots you see.
4. Recommend specific, data-backed focus areas (e.g., which services, teams, or practices to prioritize) to maximise impact on reliability, velocity, and cost-effectiveness.
```


The value isn't that AI is "doing the analysis for me." It's acting as a second set of eyes when the volume of information exceeds what's easy to reason about in one pass.

As always, the responsibility doesn't move. Any insight still needs to be evaluated, challenged, and placed in context. AI can surface possibilities, but it can't judge relevance, trade‑offs, or consequences.

**Takeaway:** Used this way, data analysis becomes another example of AI supporting leadership work - helping reduce cognitive load while leaving judgment firmly where it belongs.

## Closing Thoughts

While there are so many other ways in which I use AI, I thought I would give you a mixture of use cases to hopefully inspire you to do the same. Across all of these examples, the pattern is consistent. I use AI where it sharpens my thinking, accelerates feedback, or reduces friction. I avoid it where it distances me from responsibility or weakens judgment.

Used this way, AI isn't a shortcut. It's an amplifier.
