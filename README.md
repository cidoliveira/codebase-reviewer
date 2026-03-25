# Codebase Reviewer

A skill for AI coding agents that reviews your entire codebase, writes down every question worth asking, and then fixes what you tell it to.

Works with [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Cursor](https://cursor.sh), [Codex CLI](https://github.com/openai/codex), [Antigravity](https://antigravity.dev), [Windsurf](https://windsurf.com), and any agent that reads the [agentskills.io](https://agentskills.io) format.

## How it works

The agent reads through every file, endpoint, and logic path in your project. It writes a `QUESTIONS.md` at the root with everything it found odd, broken, or improvable -- tagged by category and severity.

You answer each question. Some are bugs. Some are intended behavior. Some you'll want to defer. Your call.

Then you prompt the agent again. It reads your answers and starts fixing things -- security issues first, bugs next, then everything else down the priority list.

## Install

For Claude Code:

```bash
npx codebase-reviewer
```

For other agents, grab `SKILL.md` from this repo and drop it in your agent's skill directory.

## Usage

```
/code-review
```

You get back something like:

```
### SEC-001: Webhook routes bypass auth middleware
File(s): server.ts:87
Severity: High
Observation: /api/webhook routes skip authentication entirely.
Question: Intentional? If these endpoints are public, there's no input validation.
Answer:
```

Fill in the answers, prompt the agent again, and it gets to work.

## Categories

| Prefix | Covers |
|--------|--------|
| `ARCH` | Architecture, structure, dependency issues |
| `SEC` | Security gaps, auth holes, data exposure |
| `PERF` | Slow queries, memory leaks, missing caches |
| `QUAL` | Dead code, duplication, naming, typing |
| `BUG` | Race conditions, null handling, broken paths |
| `IMP` | Missing features, test gaps, upgrades |

## License

MIT
