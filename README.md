# Codebase Reviewer

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill that performs systematic codebase reviews as a professional code reviewer and tech lead.

## What It Does

Two-phase review process:

1. **Deep Review** — Scans your entire codebase and generates a `QUESTIONS.md` with categorized findings (architecture, security, performance, code quality, bugs, improvements)
2. **Implement Fixes** — After you answer the questions, implements improvements based on your responses, prioritized by severity

## Install

Copy `SKILL.md` to your Claude Code personal skills directory:

```bash
mkdir -p ~/.claude/skills/code-review
cp SKILL.md ~/.claude/skills/code-review/SKILL.md
```

## Usage

In any project with Claude Code:

```
/code-review
```

Claude will review every file, endpoint, and logic path, then produce a `QUESTIONS.md` at the project root:

```markdown
### SEC-001: Webhook routes bypass auth middleware
**File(s):** `server.ts:87`
**Severity:** High
**Observation:** The /api/webhook routes skip authentication entirely.
**Question:** Is this intentional? If public, input validation is missing.
**Answer:**
```

Fill in the `Answer:` fields, then prompt Claude again to start fixing.

## Question Categories

| Prefix | Category |
|--------|----------|
| `ARCH` | Architecture & Structure |
| `SEC` | Security |
| `PERF` | Performance |
| `QUAL` | Code Quality & Refactoring |
| `BUG` | Bugs & Potential Issues |
| `IMP` | Improvements & Suggestions |

## License

MIT
