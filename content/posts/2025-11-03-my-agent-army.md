---
title: "My Agent Army Using the HMAS Architecture"
date: 2025-11-03T16:25:10Z
draft: false
toc: false
images:
tags:
  - ai
---

I’ve been diving head-first into the world of AI-driven development lately, specifically playing around with [OpenCode](httpss://opencode.ai/docs/agents/) and its agent framework. Like many, my first attempts were with a single, monolithic agent. You ask it to do something, and it... well, it _tries_ to do everything. It plans, it codes, it researches, all in one massive, chaotic context window.

It works, sort of. But it always felt a bit fragile. The agent would often get lost, forget the initial goal, or just pollute its own context window to the point of confusion. I’d heard that setting up subagents was a more context-efficient solution, and this got me thinking. If I were to build a _real_ suite of agents, a "virtual team" to build the best software possible, what should that look like?

## The Problem with "One Big Brain"

My initial hunch about efficiency turned out to be the core problem. The biggest challenge for any LLM is the finite context window. When one agent tries to do everything, it's like a developer trying to code, read five API docs, and attend a planning meeting all at the same time. You can't keep it all in your head.

Research from teams at Anthropic confirms this. The most successful agentic systems use subagents with their own **"isolated context windows"**[^1]. A primary agent can delegate a heavy task (like sifting through a huge repository) to a specialist. That specialist does its work and then passes back just a "lightweight reference" or a simple result, not its entire messy thought process. This keeps the main agent's context clean and focused, which is a massive win for performance and reliability.

This idea of specialised agents collaborating is a key finding in building scalable AI systems. It’s been shown to improve everything from reasoning to thorough validation.

## The "Aha!" Moment: The Hierarchical Model

This led me down a rabbit hole of agent architectures. I wasn't just building a _collection_ of agents; I needed an _architecture_. I soon stumbled upon the concept of a **Hierarchical Multi-Agent System (HMAS)**, and it just clicked.

The idea, as outlined in some fantastic research[^2], is to structure agents not as a flat "swarm" but as a company org chart, with clear layers of responsibility:

> - **Layer 1 (Strategy):** This is the "leader or orchestrator." It decides _what_ matters most and in _which order_.
> - **Layer 2 (Planning):** These are the "decomposers." They re-express those priorities into consumable subtasks for the specialists.
> - **Layer 3 (Execution):** These are the "workers." They are the specialists that perform the actual work, like generating code or running tests.

This structure immediately solves the cognitive load problem. The `Coder` agent doesn't need to know the entire business strategy; it just needs to know the technical spec for the function it's writing.

The best part? This isn't just theory. The OpenCode framework maps to this _perfectly_.

- OpenCode's **`primary` agents** are the perfect fit for the **L1 Orchestrator**.
- OpenCode's **`subagents`** are the **L2 Planners** and **L3 Execution** specialists.

You can even define each of these subagents as a simple Markdown file in the `.opencode/agent/` directory, each with its own prompt, model, and toolset. This makes your "virtual team" a version-controlled, modular part of your repository.

## My Virtual Software Ensemble

So, I set out to design my "virtual team" based on this three-layer HMAS architecture. Here's the breakdown of the agents I’m building and their responsibilities.

#### Layer 1 (Strategy): The Central Orchestrator

This layer has just one agent, the boss.

- **`Orchestrator` (The Project Manager):** This is the main `primary` agent and the only one I talk to. It's the "Project Manager AI Agent." Its job isn't to code, but to _manage the workflow_. It interprets my goal, asks clarifying questions , and then delegates every single task to the specialists below.

#### Layer 2 (Planning): The Decomposers and Architects

This is the "middle management" that turns a vague idea into a concrete plan. This layer is the key to stopping "vibe coding" and enforcing "spec-driven development."

- **`Planner` (The Product Manager):** This agent takes my goal (e.g., "Add user auth") and acts like a Product Manager. It decomposes the goal into detailed artifacts: user stories, testable acceptance criteria, and a structured list of sub-tasks for the `Coder`.
- **`Architect` (The AI/Knowledge Architect):** This agent acts as the team's "Knowledge Architect." It reads the `CONTRIBUTING.md` and other architecture docs to define the _technical constraints_. It answers questions like, "What libraries should we use?" or "What's our standard API pattern?"

#### Layer 3 (Execution): The Specialist Worker Agents

This is where the magic happens. These are the "doers" who get their tasks from the L2 agents.

- **`Research` (The Technical Researcher):** A specialist agent that can be called by the `Architect` or `Coder`. Its only job is to answer open-ended questions, like "Compare these two libraries" or "Find an example of how to implement this OAuth flow."
- **`Coder` (The Developer):** The workhorse. This agent _only_ acts on the detailed, unambiguous tasks from the `Planner` and `Architect`. It's an execution agent, not a planner. Its job is to write the code to spec.
- **`Test` (The QA Engineer):** This is a "Verifier Agent." It's an autonomous QA engineer that reads the `Planner`'s acceptance criteria and _generates the unit and integration tests_. Even better, it's capable of "self-healing tests"—detecting when a UI change breaks a locator and _fixing the test script automatically_.
- **`Debugger` (The Root Cause Analyst):** This agent is my favourite. It's an "AI Incident Investigator" that's _only_ invoked when the `Test` agent's run fails. Its job isn't just to report the failure, but to find the _root cause_ by correlating logs, code changes, and test results.
- **`Security` (The Security Auditor):** Another "Verifier Agent." This one is inspired by OpenAI's "Aardvark" agent[^3]. It scans new code for vulnerabilities (like the OWASP Top 10) and exposed secrets, acting as an autonomous, continuous security review.

## The Magic: The Autonomous "Inner Loop"

This is where it all comes together. The big problem in AI development is the "speed vs. trust" gap. Agents are _fast_ at generating code, but we can't _trust_ it. This architecture builds an autonomous, internal development loop that solves for trust.

Think about this flow:

1.  The `Coder` agent finishes its task.
2.  The `Orchestrator` immediately delegates to the `Test` agent.
3.  The `Test` agent runs and... **it fails!**
4.  In a monolithic system, the process would stop and wait for me. But here, the `Orchestrator` just invokes the `Debugger` agent.
5.  The `Debugger` agent performs its root cause analysis and reports back: "The test failed because `Coder` forgot to inject the `DatabaseService`."
6.  The `Orchestrator` then passes this report back to the `Coder` agent with a new instruction: "Apply this fix."
7.  The `Coder` applies the patch, and the loop starts over.

This `Coder` -> `Test` -> `Debugger` -> `Coder` cycle can iterate _multiple times_ without any human intervention. I only see the final, validated, tested, and secured result.

### See this in practice

Here's some snippets from a recent session:

```bash
...

## Evaluating security concerns
- Security reports highlight several medium-to-high issues, including insecure protocols and lack of authentication.
- Input validation problems were also noted, suggesting potential vulnerabilities in user data handling.

...

% Task Analyze security vulnerabilities in the code

...

@Debugger provided root cause analysis on the security issues.

...

@Coder has applied the fixes.

...

% Task Re-run tests after security fixes

...

@Test: All tests pass, no regressions.
## Reviewing test results
- All tests passed, indicating no regressions in functionality.

...

```

And the outcome:

```bash
Project Complete: Agent Chat TUI with Google ADK/A2A Support
I have successfully built and delivered a complete Go-based TUI chat application for interacting with Google Agent Development Kit (ADK) agents over HTTP and Agent-to-Agent (A2A) protocols. The implementation follows a rigorous development workflow with planning, architecture, coding, testing, and security auditing.

What Was Built
Core Application: A terminal user interface (TUI) built with Bubbletea that enables real-time chatting with ADK agents.

Key Features:
- Interactive TUI: Clean terminal interface with chat display, agent list, input field, and status indicators
- Dual Protocol Support: HTTP REST API client for basic chat + WebSocket-based A2A client for advanced agent interactions
- Real-time Communication: Streaming message support, agent metadata fetching, and connection management
- Message History: Persistent chat history during sessions with timestamps and sender identification
- Error Handling: Comprehensive error management with user-friendly messages and graceful degradation

Technical Stack:
- Language: Go 1.21+ with strict type safety
- TUI Framework: Bubbletea with Lipgloss for styling
- HTTP Client: Standard library with TLS 1.2+ and rate limiting
- A2A Protocol: WebSocket client with JSON-RPC message handling
- Security: Input validation, XSS sanitization, secure configuration loading
- Dependencies: Minimal set including gorilla/websocket, bluemonday, google/uuid

Security & Quality Assurance
Security Measures Implemented:
- TLS Encryption: HTTPS/WSS enforced by default with secure cipher suites
- Authentication: Bearer token support loaded securely from environment variables
- Input Validation: Message length limits (1000 chars), type validation, and XSS prevention
- Rate Limiting: Token bucket rate limiter (10 req/sec default) to prevent abuse
- Resource Protection: Message size limits (1KB), bounded channels, and memory-safe operations
- Secret Management: No hardcoded credentials; environment variable loading for sensitive config

Testing Results:
- Unit Tests: 100% pass rate across all components (models, clients, TUI, utilities)
- Integration Tests: Verified HTTP/WebSocket communication, message handling, and error scenarios
- Edge Cases: Network failures, invalid inputs, protocol mismatches all handled gracefully
- Security Audit: Clean security status with no remaining vulnerabilities (OWASP Top 10 compliant)
```

## Summary: The Agentic Software Ensemble

Here’s a quick summary of the whole virtual team.

| Agent Name         | HMAS Layer     | Primary Responsibility                                                                                                      | Key Collaborator(s)                  |
| :----------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| **`Orchestrator`** | L1 (Strategy)  | The "Project Manager." Interprets user goals, creates high-level plans, and delegates to all subagents.                     | User, `@Planner`, `@Coder`, `@Test`  |
| **`Planner`**      | L2 (Planning)  | The "Product Manager." Decomposes goals into detailed specs, user stories, and acceptance criteria.                         | `Orchestrator`, `@Coder`, `@Test`    |
| **`Architect`**    | L2 (Planning)  | The "Knowledge Architect." Defines technical constraints, selects technology, and ensures alignment with project standards. | `Orchestrator`, `@Planner`, `@Coder` |
| **`Research`**     | L3 (Execution) | The "Technical Researcher." Investigates libraries, analyzes API documentation, and answers complex technical questions.    | `Architect`, `Coder`                 |
| **`Coder`**        | L3 (Execution) | The "Developer." Generates and modifies code based on the _specific_ plan from the L2 agents.                               | `Planner`, `Architect`, `@Test`      |
| **`Test`**         | L3 (Execution) | The "QA Engineer." Generates and runs tests based on acceptance criteria. Capable of "self-healing" broken tests.           | `Planner`, `Coder`, `@Debugger`      |
| **`Debugger`**     | L3 (Execution) | The "Root Cause Analyst (SRE)." Invoked on test failure. Correlates logs and changes to find the root cause of bugs.        | `Test`, `Orchestrator`, `@Coder`     |
| **`Security`**     | L3 (Execution) | The "Security Auditor." Scans code for vulnerabilities (OWASP, secrets) and suggests remediation patches.                   | `Orchestrator`, `Coder`              |

## Conclusion

When I wrote about my "Second Brain", it was a journey to find a system for organising what I read. This feels very similar. It's not just about getting an AI to write code; it's about building a _system_ I can trust.

This hierarchical, role-based approach transforms AI agents from being a clever, unpredictable "tool" into a reliable, autonomous "team." It's a system that's not just _fast_, but _trustworthy_. And as an engineer, that's the only thing that really matters.

## Footnotes

[^1]: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
[^2]: https://jtanruan.medium.com/hierarchical-multi-agent-systems-with-amazon-bedrock-orchestrating-agents-for-drug-discovery-1c6b6aff9acd
[^3]: https://cybersecuritynews.com/aardvark-gpt-5-agent/
