---
name: ship-slice
description: Wrap up a unit of portfolio work: verify the build, check consistency and comments, commit as Jax Engel, push, update docs/plan.md and docs/decisions.md, and get approval and merge into `redesign`. Use at the end of each slice or after any meaningful commit-worthy change in this repo.
---

# Ship a slice

1. **Identity.** `git config user.name` must be `Jax Engel` and `user.email` `6673768+jaxatto@users.noreply.github.com`. Set them locally if not.
2. **Verify.** Run `npm run build`. Run `npx tsc --noEmit`; the only expected error is the baseline one in `src/index.tsx`. For UI work, look at it at 1280, tablet and ~375 widths and say which you actually checked.
2b. **Copy.** If any copy changed, run the `copy-check` skill and fix what it flags.
3. **Consistency check.** No hard-coded colors, sizes or breakpoints that have a token. No new one-off styles or components without an entry in `docs/decisions.md`. Accessibility basics hold (heading order, alt text, focus, contrast).
4. **Comments.** Non-obvious choices have a `// NOTE:` explaining why; open design/copy questions have `// TODO(jax):`; decision-linked code points to its D-number.
5. **Docs.** Update `docs/plan.md` (status, what's next, open questions) and add or revise `docs/decisions.md` entries. Keep them short and current; remove what's stale. Update `CLAUDE.md` only if a rule or command changed.
6. **Commit.** Small, one logical change per commit, short imperative subject. Include the attribution trailers the session specifies.
7. **Push** to the session's designated branch. Never push to `main`, and never deploy.
8. **Review package.** Make sure the dev server is up (`npm run dev`). Give Jax the exact routes/sections to review (for example `http://localhost:5173/about`, "hero section, light and dark"), a screenshot of each sent with `SendUserFile`, and real markdown links to any files changed or added.
9. **Ask for approval.** Summarize what changed and what was and wasn't verified. On Jax's approval, open a PR from the working branch into **`redesign`** (not `main`) and merge it. Don't merge without approval.
