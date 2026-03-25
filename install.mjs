#!/usr/bin/env node

import { mkdirSync, copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { homedir } from "os";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillDir = join(homedir(), ".claude", "skills", "code-review");
const source = join(__dirname, "SKILL.md");
const dest = join(skillDir, "SKILL.md");

mkdirSync(skillDir, { recursive: true });
copyFileSync(source, dest);

const isUpdate = existsSync(dest);
console.log(`\n  ✓ code-review skill ${isUpdate ? "updated" : "installed"} at ${dest}\n`);
console.log("  Usage: run /code-review in any project with Claude Code\n");
