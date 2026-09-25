# Repository Agent Instructions

## Pull Request Readiness

Codex is pre-approved to mark draft pull requests as ready for review in this
repository when the requested work is complete, required checks and review-app
verification are passing or any non-blocking skip is documented, and there are
no known unresolved blocking review comments or user-requested changes.

Codex does not need to ask again before running `gh pr ready` under those
conditions. If required checks are failing, review-app verification is broken,
or blocking feedback remains unresolved, leave the pull request as draft and
report the blocker instead.

## Agent Workflow Configuration

Portable shared skills resolve this repo's commands and policy through:
- **Commands** — run `.agents/bin/<name>` (`setup`, `validate`, `test`, ...); see `.agents/bin/README.md`. A missing script means that capability is n/a here.
- **Policy / config** — `.agents/agent-workflow.yml`.

## Review and Merge Gate

AI reviewers are advisory unless they report a blocker. Before merging, require
every current-head `gh pr checks` entry to pass, all review threads to be
resolved, and GitHub to report clean mergeability. The seam grants no standing
approval or merge authority; follow the direct user or maintainer instruction.
The local validation wrapper runs RSpec; it does not replace hosted PR checks.

Prefix follow-up issue titles with `Follow-up:`.
