#!/usr/bin/env node

const { mkdirSync, copyFileSync, existsSync } = require("fs");
const { join } = require("path");
const { homedir } = require("os");

const skillDir = join(homedir(), ".claude", "skills", "code-review");
const source = join(__dirname, "SKILL.md");
const dest = join(skillDir, "SKILL.md");
const exists = existsSync(dest);

mkdirSync(skillDir, { recursive: true });
copyFileSync(source, dest);

console.log(`\n  ${exists ? "updated" : "installed"}: ${dest}\n`);
console.log("  Run /code-review in any project to start a review.\n");
console.log("  Other agents (Cursor, Codex, Windsurf, Antigravity):");
console.log("  Copy SKILL.md to your agent's skill directory.\n");
