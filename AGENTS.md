<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

<!-- BEGIN:karpathy-coding-guidelines -->
# Coding Agent Behavioral Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
<!-- END:karpathy-coding-guidelines -->

---

<!-- BEGIN:crg-usage-policy -->
# Better Code Review Graph (CRG)

## CRG First Policy

For any task requiring understanding existing code, architecture, dependencies, data flow, bug investigation, refactoring, code review, or implementation planning:

Use CRG before using `rg`, `grep`, `find`, or manually opening files.

Priority:

1. CRG
2. rg
3. find
4. manual exploration

## Mandatory CRG Usage

CRG must be used before implementation when:

- More than one file may be affected.
- The codebase area is unfamiliar.
- The request involves bug fixing.
- The request involves refactoring.
- The request involves architecture decisions.
- The request involves code review.
- The request requires understanding relationships between components.

## Required Workflow

Before modifying code:

1. Use CRG search to locate relevant code.
2. Use CRG traversal to understand relationships.
3. Use CRG impact analysis to identify affected files.
4. Present implementation plan.
5. Implement.

Do not perform blind edits.

## Search Rules

Prefer:

- CRG semantic search for features, logic, patterns, and architecture.
- CRG relationship analysis for dependencies and call chains.

Use `rg` only for exact text matching.

## Impact Rules

Before changing existing code:

Determine:

- Who calls this code.
- What depends on it.
- What may break.
- What tests are likely affected.

Avoid modifications without impact analysis.

## Review Rules

Before declaring completion:

Use CRG review capabilities to inspect:

- Changed files.
- Dependency impact.
- Potential regressions.
- Architectural consistency.

## Practical Rule

Single-file task:
- `rg` is acceptable.

Multi-file task:
- CRG is mandatory.
<!-- END:crg-usage-policy -->
