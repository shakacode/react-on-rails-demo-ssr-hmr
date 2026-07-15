# Agent Workflow Scripts

Standard entry points that portable agent-workflow skills call, so a skill can
run `.agents/bin/<name>` in any repo without knowing this repo's specific
commands. Each script is a thin, repo-owned wrapper. A script that is **absent**
means that capability is n/a here.

| Script | Purpose | This repo runs |
| --- | --- | --- |
| `setup` | Install dependencies and prepare the development database | `corepack yarn install "$@"` (the repository-pinned Yarn 3 release) + `bin/setup` |
| `validate` | Pre-push gate | `bundle exec rspec "$@"` |
| `test` | Run tests | `bundle exec rspec "$@"` |
| `lint` | Lint / format | n/a |
| `build` | Build / type-check | n/a |
| `docs` | Docs checks | n/a |
| `ci-detect` | CI change detector | n/a |

Non-command policy lives in [`../agent-workflow.yml`](../agent-workflow.yml).
