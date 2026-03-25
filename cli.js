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

console.log(`\n  ✓ code-review skill ${exists ? "updated" : "installed"} at ${dest}\n`);
console.log("  Usage: run /code-review in any project with Claude Code\n");
