# Control Plane Deployment Notes

This repo now includes `cpflow` scaffolding for:

- opt-in PR review apps
- automatic staging deploys from `master`
- manual promotion from staging to production

## Why This Shape

This app runs on SQLite in production and stores uploaded files on the local
disk.

The Control Plane setup mirrors that:

- `.controlplane/templates/db.yml` creates a persistent volume for `/app/db`
- `.controlplane/templates/storage.yml` creates a persistent volume for `/app/storage`
- `.controlplane/templates/rails.yml` mounts both volumes into the `rails` workload
- `.controlplane/release_script.sh` runs `bin/rails db:prepare` before deploys switch images

The generated `.controlplane/Dockerfile` installs Node.js alongside Ruby,
auto-installs JavaScript dependencies for npm/Yarn/pnpm projects, and leaves a
callable package-manager shim in place so `assets:precompile` can invoke
`yarn` again in later build steps. That matters for this demo because SSR runs
through the Rails process and still needs a working Node-backed ExecJS runtime
in production.

## Required Runtime Secrets

Before the app will boot on Control Plane, populate `SECRET_KEY_BASE` in the
generated secret dictionaries:

- `react-on-rails-demo-ssr-hmr-staging-secrets`
- `react-on-rails-demo-ssr-hmr-review-secrets`
- `react-on-rails-demo-ssr-hmr-production-secrets`

`cpflow setup-app` creates those dictionaries automatically. You only need to
add a `SECRET_KEY_BASE` entry to each one before the first deploy.

## Local cpflow Flow

Typical setup:

```sh
export APP_NAME=react-on-rails-demo-ssr-hmr-staging

cpflow setup-app -a "$APP_NAME"
cpflow build-image -a "$APP_NAME"
cpflow deploy-image -a "$APP_NAME" --run-release-phase
cpflow open -a "$APP_NAME"
```

## GitHub Actions Variables And Secrets

Set these in GitHub before enabling the generated `cpflow-*` workflows:

- `CPLN_TOKEN_STAGING`
- `CPLN_TOKEN_PRODUCTION`
- `CPLN_ORG_STAGING`
- `CPLN_ORG_PRODUCTION`
- `STAGING_APP_NAME=react-on-rails-demo-ssr-hmr-staging`
- `PRODUCTION_APP_NAME=react-on-rails-demo-ssr-hmr-production`
- `REVIEW_APP_PREFIX=react-on-rails-demo-ssr-hmr-review`

Optional:

- `STAGING_APP_BRANCH=master`
- `PRIMARY_WORKLOAD=rails`
