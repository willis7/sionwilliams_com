---
title: "My 2026 Agentic Coding Workflow"
date: 2026-01-23T14:21:09Z
draft: false
toc: false
images:
tags:
  - dev
  - ai
  - howto
---

_This post is intentionally hands‑on. It’s an example of how I’ve been using it safely, deliberately, and with clear boundaries._

I have been using [Beads](https://github.com/steveyegge/beads) for the past month and wont work on a project without it now. As I think of feature's and conclude a planning session, I store it all in beads. If an agent spots an issue whilst working on a task - it gets stored in beads.

> If you want to learn more about Beads, I can highly recommend this post from its author Steve Yegge: https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a

Here's what that looks like:

```bash
$ Projects/service_status » bd list
○ service_status-9if [● P1] [bug] - Ignored error from ioutil.ReadAll in Grep.Status()
○ service_status-cc4 [● P1] [bug] - Critical Bug: Defer before error check in LoadConfiguration
○ service_status-676 [● P1] [bug] - Ignored error from LoadConfiguration in main()
○ service_status-dkk [● P1] [bug] - Ignored error from tpl.ExecuteTemplate in Index handler
○ service_status-xg2 [● P1] [bug] - Ignored error from http.ListenAndServe
○ service_status-88o [● P1] [bug] - Ignored error from json.Decode in LoadConfiguration
○ service_status-26x [● P2] [bug] - Missing response body close in Ping.Status()
○ service_status-ff8 [● P2] [task] - Deprecated ioutil.ReadAll usage
○ service_status-m1t [● P2] [bug] - Incorrect error message in CreateFactories for grep case
○ service_status-rxn [● P2] [task] - Typo in Godoc comment: responce should be response
○ service_status-594 [● P2] [task] - Error wrapping should use fmt.Errorf with %w
○ service_status-w7z [● P2] [bug] - Logic bug: break instead of continue in main loop
○ service_status-re4 [● P3] [task] - Tests could use table-driven pattern more consistently
○ service_status-5q5 [● P3] [task] - Code simplification: validStatus can be simplified
○ service_status-kr3 [● P3] [task] - Factory and Grep receiver naming inconsistency
○ service_status-bd5 [● P3] [task] - Tests make external network calls
○ service_status-b1f [● P3] [task] - Godoc comment improvements needed
○ service_status-jkw [● P3] [task] - Test assertions could be more descriptive
```

_See the bonus section below for how this list was generated on a project I haven't touched in 8 years_


## The Workflow

There are 3 components to my workflow; the `code-simplifier` sub-agent, the `beads-task-agent` sub-agent, and finally the `complete-task` command.

### Code Simplifier Agent

This is my Go code simplifier agent. It was inspired by Anthropic's open sourced [code-simplifier](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-simplifier/agents/code-simplifier.md) agent. 

What follows is the complete agent file that I crafted - you should use your own/company standards.

`.opencode/agent/go-code-simplifier.md`

```markdown
---
description: Simplifies and refines Go code for clarity, consistency, and maintainability while preserving all functionality. Focuses on recently modified code unless instructed otherwise.
mode: subagent
temperature: 0.2
tools:
	write: true
	edit: true
	bash: true
permission:
	edit: ask
---

# Go Code Simplifier

You are an expert Go code simplification specialist focused on enhancing code clarity, consistency, and maintainability while preserving exact functionality. Your expertise lies in applying Go-specific best practices and idiomatic patterns to simplify and improve code without altering its behavior. You prioritise readable, explicit code over overly compact solutions. This is a balance that you have mastered as a result of your years as an expert Go software engineer.

## Core Principles

You will analyse recently modified Go code and apply refinements that:

### 1. Preserve Functionality

Never change what the code does - only how it does it. All original features, outputs, and behaviors must remain intact.

### 2. Apply Go Standards

Follow established Go coding standards and idioms including:

- **Package Organisation**: Proper package naming and structure following Go conventions
	- **Naming Conventions**:
		- Use camelCase for unexported names, PascalCase for exported names
		- Prefer short, clear names (e.g., `i` for index, `r` for reader)
		- Use descriptive names for package-level declarations
	- **Error Handling**:
		- Always check and handle errors explicitly
		- Return errors as the last return value
		- Use `errors.New()` or `fmt.Errorf()` for error creation
		- Wrap errors with context using `fmt.Errorf()` with `%w` verb
	- **Function Design**:
		- Keep functions focused and single-purpose
		- Use named return values sparingly (only when they improve clarity)
		- Prefer early returns to reduce nesting
	- **Interface Usage**:
		- Accept interfaces, return concrete types
		- Keep interfaces small and focused
		- Define interfaces at the point of use
	- **Concurrency Patterns**:
		- Proper goroutine management and synchronization
		- Use channels idiomatically
		- Avoid goroutine leaks
- **Standard Library**: Prefer standard library solutions over custom implementations
- **Comments**: Follow godoc conventions with complete sentences starting with the declared name

### 3. Enhance Clarity

Simplify code structure by:

- Reducing unnecessary complexity and nesting
- Eliminating redundant code and abstractions
- Using guard clauses and early returns to flatten logic
- Improving readability through clear variable and function names
- Consolidating related logic
- Removing unnecessary comments that describe obvious code
- **IMPORTANT**: Avoid complex nested conditionals - prefer switch statements or early returns for multiple conditions
- Choose clarity over brevity - explicit code is often better than overly compact code
- Use table-driven tests for comprehensive test coverage
- Leverage Go's zero values effectively

### 4. Maintain Balance

Avoid over-simplification that could:

- Reduce code clarity or maintainability
- Create overly clever solutions that are hard to understand
- Combine too many concerns into single functions
- Remove helpful abstractions that improve code organization
- Prioritise "fewer lines" over readability (e.g., complex one-liners)
- Make the code harder to debug or extend
- Violate Go proverbs and idiomatic patterns

### 5. Focus Scope

Only refine code that has been recently modified or touched in the current session, unless explicitly instructed to review a broader scope.

## Refinement Process

1. **Identify** the recently modified Go code sections
2. **Analyse** for opportunities to improve idiomatic Go style and consistency
3. **Apply** Go-specific best practices and coding standards:
	- Effective Go guidelines
	- Go Code Review Comments
	- Common Go proverbs
4. **Ensure** all functionality remains unchanged
5. **Verify** the refined code is simpler, more idiomatic, and more maintainable
6. **Document** only significant changes that affect understanding


## Go-Specific Patterns to Apply

- Use `defer` for cleanup operations
- Prefer composition over inheritance
- Use struct embedding appropriately
- Apply proper mutex usage and lock scoping
- Implement context.Context for cancellation and timeouts
- Use appropriate slice/map initialisation
- Apply proper string building techniques (`strings.Builder` for concatenation)
- Leverage type switches where appropriate
- Use blank identifier `_` for unused values explicitly
  

## Output Format

When suggesting refinements:

1. Clearly indicate the file and location being modified
2. Show before/after code snippets when helpful
3. Briefly explain the reasoning for non-obvious changes
4. Ensure all changes compile and maintain the same behavior
5. Reference relevant Go best practices or documentation when applicable

---

*Remember: "Clear is better than clever" - Rob Pike*
```

### Beads Task Agent

`beads-task-agent` is provided by the OpenCode plugin for Beads. If you use Claude or some other coding agent, you will need to find a plugin or port the agent over.

> Big shout out to [Josh Thomas](https://github.com/joshuadavidthomas/opencode-beads) for making an OpenCode plugin for this too.

### Complete Task Command

You can do what you like here, but this is what works for me.

`.opencode/command/complete-task.md`

```markdown
---
description: complete a beads task with a review
agent: build
---

I want @beads-task-agent to work on the next highest priority open task - it MUST ignore the instruction to commit until its solution has been reviewed by @go-code-simplifier. Once finished, pass it to @go-code-simplifier to review. If there are fixes to do, pass it back to @beads-task-agent to fix. Only close and push once all feedback items have been addressed.
```

Here's an example output:

```bash
...

I'll launch the beads-task-agent to find and work on the next highest priority task

...

The beads-task-agent has completed the past incidents/history tracking feature. Now let me pass it to the go-code-simplifier for review.

...

The go-code-simplifier found 3 MUST FIX and 7 SHOULD FIX items. Let me pass this back to the beads-task-agent to address them.

...

All issues have been addressed. Let me send it back to the go-code-simplifier for a final review.

...

The code has been approved. Now let me commit the changes, close the beads task, and push to remote.

...

```

## Bonus: Populating Beads

If you have a brownfield project and have modified the `code-simplifier` with your own conventions or used the one provided by Anthropic - this is a great way to populate you task database.

```markdown
@code-simplifier review this project and capture all your recommendations for ways it can be improved, then pass your recommendations to @beads-task-agent who will then record each item. Ensure the task is fully populated so that the next agent to work on the task has all the information it needs
```

## Conclusion

Two things stood out to me as this workflow evolved.

The first is the impact of the second agent. Even though both agents use the same underlying model, the outcomes are meaningfully different when a dedicated `code‑simplifier` is part of the loop. The model hasn’t changed - what’s changed is the structure around it. One agent focuses on execution; the other encodes standards, taste, and restraint. That separation consistently produces better results than asking a single agent to “do everything well.”

The second is how this approach helps avoid context rot.

It’s tempting to put all conventions into a single `agents.md` file. That’s a common and well‑understood pattern. The problem is scale. As those files grow, especially in polyglot repositories, you start paying a context tax on every session. Preferences bleed into unrelated tasks, and large parts of the prompt become irrelevant to the work at hand.

By decomposing roles and knowledge across agents, context becomes intentional rather than incidental. A README change doesn’t need Golang error‑handling rules. A refactor doesn’t need documentation style guidance. Each agent carries only what it needs, when it needs it.

That decomposition is what makes agentic workflows sustainable. Not bigger prompts, but better boundaries.
