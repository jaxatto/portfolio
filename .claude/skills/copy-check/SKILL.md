---
name: copy-check
description: Check portfolio copy against Jax's writing rules before committing it. Runs a script that flags em dashes, semicolons, "not X, it's Y" phrasing, comma-set clauses between a subject and its verb, run-ons, long sentences and buzzwords, then a human read for what a pattern cannot catch. Use whenever copy in src/pages or src/components was written or edited.
---

# Copy check

Run this after writing or editing any page copy, meta description, card text, caption or alt text, and before committing it.

1. **Run the script.**
   ```
   node .claude/skills/copy-check/check.mjs            # src/pages and src/components
   node .claude/skills/copy-check/check.mjs <file>     # one file or folder
   ```
   It lists `file:line`, the rule and the sentence. Errors (exit code 1) are hard rules, warnings are candidates to review. It is pattern based: it finds suspects, it does not prove a sentence is good, and it can miss a differently worded version of the same problem.
2. **Fix every error.** Warnings need a decision: fix them, or leave them and know why.
3. **Read it as a person.** For each changed sentence ask:
   - Are the subject and its verb together? Detail goes in its own short sentence or at the end ("The ICL was strict. Designers avoided it.").
   - Is there one idea per sentence, and can you say it aloud in one breath?
   - Is every number, name and claim something Jax has given or confirmed? Ask instead of inventing.
   - Does it state what Jax did directly, with no contrast ("not X but Y", "rather than", "instead of")?
   - Is it close to the original where the original was fine (revise lightly), and does it avoid phrasing used elsewhere on the site?
4. **Report** what the script found, what you changed, and what you left on purpose.

## The rules (from CLAUDE.md, Copy voice)

| Rule | Script id | Level |
| --- | --- | --- |
| No em dashes | `em-dash` | error |
| No semicolons | `semicolon` | error |
| No "not X, it's Y" contrast, "rather than", "instead of" | `contrast` | error |
| No comma-set clause between a subject and its verb | `interrupting-clause` (also `which-mid`) | error, warn |
| No run-ons (over 30 words) | `run-on`, `long-sentence` (over 25) | error, warn |
| No buzzwords or filler | `buzzword` | warn |

To change a rule, edit `check.mjs` and this table in the same commit, and say why in `docs/decisions.md`.

## Optional: other writing skills

Plugins that can help with editing and diagnosis (enable them first): Website Copywriting & Positioning, ISO 24495 Plain Language, anti-ai-writing. Use them for a second opinion, not instead of the steps above.
