---
name: code-review
description: Use when reviewing an entire codebase for quality, joining a new project, onboarding as tech lead, before major refactors, or auditing accumulated technical debt and code issues.
---

# Code Review

Professional code reviewer and tech lead for any codebase. Two-phase process: deep review generating QUESTIONS.md, then implementing improvements from developer answers.

## When to Use

- Joining or onboarding to a new codebase
- Before a major refactor or architecture change
- Periodic code quality audit
- Suspecting accumulated technical debt
- Before handoff to another developer or team

## When NOT to Use

- Single file or PR review (review directly)
- Known specific bug (use debugging workflow)
- Greenfield project with no code yet

## Phase 1: Deep Review

### Step 1: Map the Codebase

Before writing any questions, understand the full picture:

- Project structure and file organization
- Tech stack, dependencies, and their versions
- Entry points: pages, routes, endpoints, scripts, workers
- Data flow, state management, and persistence
- Auth/authz patterns and middleware chain
- Environment and configuration management
- Test coverage and testing strategy

Use `Glob` and `Read` to scan every file. Skip `node_modules`, `dist`, build artifacts, and lock files.

### Step 2: Analyze Every Dimension

Review each file, page, endpoint, and logic path:

| Category | Prefix | What to Look For |
|----------|--------|-----------------|
| Architecture | `ARCH` | Separation of concerns, dependency direction, circular deps, coupling/cohesion, component boundaries, scalability limits, missing abstractions, layering violations |
| Security | `SEC` | OWASP Top 10, injection vectors (SQL/XSS/command), auth gaps, exposed secrets, CORS misconfiguration, missing input validation, rate limiting, data exposure, insecure dependencies |
| Performance | `PERF` | N+1 queries, missing indexes, unnecessary re-renders, unbounded lists, memory leaks, heavy synchronous operations, missing caching, large bundle sizes, unoptimized assets |
| Code Quality | `QUAL` | Dead code, duplication, god functions/classes, inconsistent naming, missing error handling, unclear abstractions, magic values, poor typing, missing documentation on complex logic |
| Bugs | `BUG` | Race conditions, off-by-one errors, null/undefined handling, unhandled edge cases, type mismatches, broken error paths, state inconsistencies, uncaught promise rejections |
| Improvements | `IMP` | Missing features implied by the codebase, better patterns available, dependency upgrades, DX improvements, test gaps, accessibility issues, missing logging/observability |

### Step 3: Write QUESTIONS.md

Create `QUESTIONS.md` at project root. **Be exhaustive** — capture every finding from critical to minor.

```markdown
# Code Review Questions

> Answer each question in the **Answer:** field below it.
> Use "intended behavior", "won't fix", or describe the desired fix.
> Then prompt me again to start implementing improvements.

## Architecture & Structure

### ARCH-001: [Short descriptive title]
**File(s):** `path/to/file.ts:42`
**Severity:** Critical | High | Medium | Low
**Observation:** [What you found and why it caught your attention]
**Question:** [Specific question for the developer]
**Answer:**

---

### ARCH-002: ...

## Security
### SEC-001: ...

## Performance
### PERF-001: ...

## Code Quality & Refactoring
### QUAL-001: ...

## Bugs & Potential Issues
### BUG-001: ...

## Improvements & Suggestions
### IMP-001: ...
```

### Question Quality Rules

**Every question MUST:**
- Have a unique ID (`CATEGORY-NNN`)
- Reference specific files and line numbers
- Include an observation explaining what was found
- Be independently answerable (no dependencies between questions)
- Have an assigned severity

**Write insightful questions, not surface-level noise:**

```
GOOD: "SEC-003: The /api/webhook routes bypass auth middleware entirely
       (server.ts:87). Is this intentional? If these endpoints are
       public, input validation is critical since there's none currently."

BAD:  "Why is this variable named 'x'?"
BAD:  "Have you considered using TypeScript?"
```

**Don't hold back.** The file can (and should) be large. Cover the ENTIRE codebase — don't skip files or directories. Minor observations are valuable; the developer decides what matters.

### Handoff

After writing QUESTIONS.md, tell the developer:

> "I wrote QUESTIONS.md with [N] questions across [N] categories. Answer each question in the `Answer:` field — mark items as 'intended behavior', 'won't fix', or describe what should be done. Then prompt me again to start Phase 2: implementing the improvements."

---

## Phase 2: Implement Improvements

Triggered when the developer returns with answered QUESTIONS.md.

### Step 1: Read & Categorize

Read the answered QUESTIONS.md. For each question:

| Answer Type | Action |
|-------------|--------|
| "intended behavior" | Skip — not a problem |
| "won't fix" | Skip — acknowledged but deferred |
| Clear fix description | Implement the fix |
| Ambiguous answer | Ask follow-up before acting |

### Step 2: Implement by Priority

1. **Security fixes** (SEC-*) — implement immediately
2. **Bugs** (BUG-*) — high priority
3. **Performance** (PERF-*) — medium priority
4. **Architecture & refactoring** (ARCH-*, QUAL-*) — medium priority
5. **Improvements** (IMP-*) — as bandwidth allows

### Step 3: Commit & Track

- One commit per fix or per logical group of related fixes
- Reference question IDs in commit messages:
  ```
  fix(SEC-001): sanitize user input in search endpoint
  refactor(ARCH-003): extract payment logic into service layer
  perf(PERF-002): add database index for user lookup queries
  ```
- After all fixes, update QUESTIONS.md marking completed items with a checkmark
